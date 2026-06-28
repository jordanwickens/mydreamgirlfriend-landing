// Cloudflare Pages Function — Meta Conversions API (CAPI) Lead relay.
// Receives a fetch from the prelander's handleSelection JS and forwards a
// server-side Lead event to Meta, deduplicated via event_id with the client Pixel.
//
// Host-based config so a single source file serves every prelander. lp4 is the
// Realistic/Anime style chooser → content_name 'style_selection'.
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

export async function onRequestPost({ request, env }) {
  const PIXEL_ID = env.META_PIXEL_ID;
  const ACCESS_TOKEN = env.META_CAPI_TOKEN;
  const TEST_CODE = env.META_TEST_CODE;

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

  // `type` carries the selection (style on lp4, slug on lp5). `slug` is an alias
  // some pages send — accept either for content_category.
  const { type, slug, event_id, source_url } = body || {};
  const category = type || slug;
  if (!category || !event_id) {
    return jsonResp(400, { error: 'bad_request', reason: 'missing_fields' });
  }

  // Host-based config: same function serves every lp, picks content_name from origin.
  const host = (request.headers.get('Host') || '').toLowerCase();
  const lpSource = host.includes('lp5') ? 'lp5' : 'lp4';
  const contentName = lpSource === 'lp5' ? 'girl_card_click' : 'style_selection';

  // User data — IP + UA are required for good Event Match Quality. Meta hashes server-side.
  const clientIp = request.headers.get('CF-Connecting-IP') || '';
  const clientUa = request.headers.get('User-Agent') || '';

  // Pull _fbp cookie (set by Meta Pixel on first PageView) — boosts EMQ significantly.
  const cookieHeader = request.headers.get('Cookie') || '';
  const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
  const fbp = fbpMatch ? fbpMatch[1] : undefined;

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

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id,                            // dedup key — must match Pixel's eventID
        action_source: 'website',
        event_source_url: source_url || request.headers.get('Referer') || `https://${host}/`,
        user_data: userData,
        custom_data: {
          content_name: contentName,
          content_category: String(category),
          source: lpSource,
        },
      },
    ],
  };
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

    return jsonResp(200, { success: true, events_received: metaData.events_received ?? 1, lp: lpSource });
  } catch (e) {
    return jsonResp(502, { error: 'capi_fetch_failed', message: String(e?.message || e) });
  }
}

// Reject other methods cleanly (no more silent 405s).
export async function onRequest({ request }) {
  return new Response(JSON.stringify({ error: 'method_not_allowed', method: request.method }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
  });
}
