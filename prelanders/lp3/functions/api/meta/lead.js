// Cloudflare Pages Function — Meta Conversions API (CAPI) Lead relay for lp3
// (the fantasy funnel prelander). Receives a fetch from the prelander's CTA
// handler and forwards a server-side Lead event to Meta, deduplicated via
// event_id with the client Pixel. Mirrors prelanders/lp1/functions/api/meta/lead.js.
//
// Env vars (set per-project via wrangler/dashboard):
//   META_PIXEL_ID     — Meta Pixel ID (e.g. 4705360489690855)
//   META_CAPI_TOKEN   — long-lived access token (Events Manager → CAPI → Generate)
//   META_TEST_CODE    — (optional) TESTXXXX code to send test events

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

  const { fantasy, event_id, source_url } = body || {};
  if (!event_id) {
    return jsonResp(400, { error: 'bad_request', reason: 'missing_fields' });
  }

  const host = (request.headers.get('Host') || '').toLowerCase();

  // User data — IP + UA are required for good Event Match Quality. Meta hashes server-side.
  const clientIp = request.headers.get('CF-Connecting-IP') || '';
  const clientUa = request.headers.get('User-Agent') || '';

  // Pull _fbp cookie (set by Meta Pixel on first PageView) — boosts EMQ significantly.
  const cookieHeader = request.headers.get('Cookie') || '';
  const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
  const fbp = fbpMatch ? fbpMatch[1] : undefined;

  // Build fbc from fbclid in source_url. Format: fb.<subdomain_idx>.<ts_ms>.<fbclid>
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
          content_name: 'fantasy_intent',
          content_category: fantasy ? String(fantasy) : 'fantasy',
          source: 'lp3',
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

    return jsonResp(200, { success: true, events_received: metaData.events_received ?? 1, lp: 'lp3' });
  } catch (e) {
    return jsonResp(502, { error: 'capi_fetch_failed', message: String(e?.message || e) });
  }
}
