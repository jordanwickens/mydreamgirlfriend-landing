import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/meta-capi';

export async function POST(request: NextRequest) {
  const { type, event_id, source_url } = await request.json();

  if (type !== 'male' && type !== 'female') {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
  const ua = request.headers.get('user-agent') || '';

  await sendCapiEvent('Lead', {
    event_id,
    event_source_url: source_url,
    client_ip_address: ip,
    client_user_agent: ua,
    custom_data: {
      content_name: 'companion_type_selection',
      content_category: type,
      source: 'lp1',
    },
  });

  return NextResponse.json({ ok: true });
}
