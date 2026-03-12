const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

interface CapiEventData {
  event_id?: string;
  event_source_url?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  custom_data?: Record<string, unknown>;
}

export async function sendCapiEvent(
  eventName: string,
  data: CapiEventData
): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[Meta CAPI] Missing PIXEL_ID or ACCESS_TOKEN, skipping event:', eventName);
    return;
  }

  const userData: Record<string, string> = {};
  if (data.client_ip_address) userData.client_ip_address = data.client_ip_address;
  if (data.client_user_agent) userData.client_user_agent = data.client_user_agent;

  const eventPayload: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: userData,
  };

  if (data.event_id) eventPayload.event_id = data.event_id;
  if (data.event_source_url) eventPayload.event_source_url = data.event_source_url;
  if (data.custom_data) eventPayload.custom_data = data.custom_data;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [eventPayload] }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error('[Meta CAPI] Error sending event:', eventName, res.status, body);
    } else {
      console.log('[Meta CAPI] Event sent:', eventName);
    }
  } catch (err) {
    console.error('[Meta CAPI] Network error sending event:', eventName, err);
  }
}
