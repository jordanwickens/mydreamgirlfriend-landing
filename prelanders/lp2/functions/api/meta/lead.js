// Cloudflare Pages Function — Meta Conversions API (CAPI) Lead relay.
// Receives a fetch from the prelander's handleSelection JS and forwards a
// server-side Lead event to Meta, deduplicated via event_id with the client Pixel.
//
// Wired into both prelanders (lp1 + lp2). Distinguishes them via Host header so a
// single source file can serve both with appropriate content_name + source.
//
// Env vars (set per-project via wrangler/dashboard):
//   META_PIXEL_ID     — Meta Pixel ID (e.g. 4705360489690855)
//   META_CAPI_TOKEN   — long-lived access token (Events Manager → CAPI → Generate)
//   META_TEST_CODE    — (optional) TESTXXXX code to send test events
//
// Returns:
//   200 { success: true, events_received }       — Meta accepted the event
//   503 { error: 'capi_not_configured' }         — env vars missing (deploy live, secrets pending)
//   400 { error: 'bad_request' }                  — malformed body
//   502 { error: 'meta_capi_failed', details }   — Meta rejected the event

// Single catch-all handler. Cloudflare Pages gives a catch-all `onRequest`
// precedence over method-specific handlers (onRequestPost), so exporting both
// made every POST fall through to the 405 branch and the CAPI relay never ran.
// We therefore dispatch by method inside one onRequest.
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed', method: request.method }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  const PIXEL_ID = env.META_PIXEL_ID;
  const ACCESS_TOKEN = env.META_CAPI_TOKEN;
  const TEST_CODE = env.META_TEST_CODE;

  // CAPI-only test hardening (env-gated per project):
  //   META_CAPI_ONLY       — when 'true', scrub event_source_url/referrer_url to
  //                          the decoy domain so the real URL never reaches Meta,
  //                          and synthesize an _fbp (browser pixel is disabled).
  //   META_CAPI_SOURCE_URL — the decoy domain (e.g. https://mydreamgfs.com).
  //   META_CAPI_LDU        — when 'true', tag every event with Limited Data Use.
  const CAPI_ONLY = env.META_CAPI_ONLY === 'true';
  const SOURCE_URL = env.META_CAPI_SOURCE_URL;
  const LDU_ON = env.META_CAPI_LDU === 'true';

  const jsonResp = (status, body) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return jsonResp(503, { error: 'capi_not_configured' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResp(400, { error: 'bad_request', reason: 'invalid_json' });
  }

  const { type, event_id, source_url } = body || {};
  if (!type || !event_id) {
    return jsonResp(400, { error: 'bad_request', reason: 'missing_fields' });
  }

  // Host-based config: same function serves both lp1 + lp2, picks content_name from origin.
  const host = (request.headers.get('Host') || '').toLowerCase();
  const isLp1 = host.includes('lp1');
  const lpSource = isLp1 ? 'lp1' : 'lp2';
  const contentName = isLp1 ? 'companion_type_selection' : 'intent_selection';

  // User data — IP + UA are required for good Event Match Quality. Meta hashes server-side.
  const clientIp = request.headers.get('CF-Connecting-IP') || '';
  const clientUa = request.headers.get('User-Agent') || '';

  // Pull _fbp cookie (set by Meta Pixel on first PageView) — boosts EMQ significantly.
  // In CAPI-only mode the pixel is gone, so synthesize one in Meta's format and
  // Set-Cookie it on the parent domain so the app reuses the SAME fbp downstream.
  const cookieHeader = request.headers.get('Cookie') || '';
  const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
  let fbp = fbpMatch ? fbpMatch[1] : undefined;
  let fbpSynthesized = false;
  if (!fbp && CAPI_ONLY) {
    fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
    fbpSynthesized = true;
  }

  // Build fbc from fbclid in source_url. Format: fb.<subdomain_idx>.<ts_ms>.<fbclid>
  // subdomain_idx=1 matches Meta's recommendation for the eTLD+1 cookie scope (.mydreamgirlfriend.ai).
  let fbc;
  try {
    const fbclid = new URL(source_url || '').searchParams.get('fbclid');
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  } catch {}

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: clientUa,
  };
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  // In CAPI-only mode force the decoy domain so Meta never sees the real
  // prelander/app URL; otherwise keep the original behaviour.
  const eventSourceUrl = (CAPI_ONLY && SOURCE_URL)
    ? SOURCE_URL
    : (source_url || request.headers.get('Referer') || `https://${host}/`);

  const eventObj = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id,                            // dedup key — must match Pixel's eventID
    action_source: 'website',
    event_source_url: eventSourceUrl,
    user_data: userData,
    custom_data: {
      content_name: contentName,
      content_category: String(type),
      source: lpSource,
    },
  };
  if (CAPI_ONLY && SOURCE_URL) eventObj.referrer_url = SOURCE_URL;
  if (LDU_ON) {
    eventObj.data_processing_options = ['LDU'];
    eventObj.data_processing_options_country = 1;
    eventObj.data_processing_options_state = 0;
  }

  const payload = { data: [eventObj] };
  if (TEST_CODE) payload.test_event_code = TEST_CODE;

  const metaUrl = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  try {
    const metaResp = await fetch(metaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const metaData = await metaResp.json().catch(() => ({}));

    if (!metaResp.ok) {
      return jsonResp(502, { error: 'meta_capi_failed', status: metaResp.status, details: metaData });
    }

    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
    if (fbpSynthesized) {
      // Parent-domain scope so the app (mydreamgirlfriend.ai) reuses this fbp.
      headers['Set-Cookie'] =
        `_fbp=${fbp}; Path=/; Max-Age=${90 * 24 * 60 * 60}; Domain=.mydreamgirlfriend.ai; SameSite=Lax; Secure`;
    }
    return new Response(
      JSON.stringify({ success: true, events_received: metaData.events_received ?? 1, lp: lpSource }),
      { status: 200, headers }
    );
  } catch (e) {
    return jsonResp(502, { error: 'capi_fetch_failed', message: String(e?.message || e) });
  }
}
