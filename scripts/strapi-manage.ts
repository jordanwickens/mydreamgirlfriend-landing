/**
 * Strapi Content Management CLI
 *
 * Usage:
 *   npx tsx scripts/strapi-manage.ts <command> <content-type> [args] [--data '<json>']
 *
 * Commands:
 *   list   <content-type>                    List all entries (slug, title, status)
 *   get    <content-type> <slug>             Get full entry by slug (JSON output)
 *   create <content-type> --data '<json>'    Create an entry from JSON
 *   update <content-type> <documentId> --data '<json>'  Update an entry
 *   delete <content-type> <documentId>       Delete an entry
 *   publish   <content-type> <documentId>    Publish an entry
 *   unpublish <content-type> <documentId>    Unpublish an entry
 *
 * Content types: blog-posts, comparison-pages
 *
 * Environment variables (reads from .env.local automatically):
 *   STRAPI_URL          (default: http://localhost:1337)
 *   STRAPI_FULL_TOKEN   Full-access API token
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Load .env.local ─────────────────────────────────────────
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex);
      const value = trimmed.slice(eqIndex + 1);
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local not found — rely on env vars
  }
}
loadEnv();

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_FULL_TOKEN || '';

if (!TOKEN) {
  console.error('Error: STRAPI_FULL_TOKEN is not set. Add it to .env.local or pass as env var.');
  process.exit(1);
}

// ── Blocks JSON helpers (for building rich text body content) ──

export function text(t: string, opts: Record<string, boolean> = {}): any {
  return { type: 'text', text: t, ...opts };
}
export function bold(t: string): any {
  return text(t, { bold: true });
}
export function italic(t: string): any {
  return text(t, { italic: true });
}
export function link(url: string, label: string): any {
  return { type: 'link', url, children: [text(label)] };
}
export function p(...children: any[]): any {
  return { type: 'paragraph', children };
}
export function h2(t: string): any {
  return { type: 'heading', level: 2, children: [text(t)] };
}
export function h3(t: string): any {
  return { type: 'heading', level: 3, children: [text(t)] };
}
export function h4(t: string): any {
  return { type: 'heading', level: 4, children: [text(t)] };
}
export function ul(...items: any[][]): any {
  return {
    type: 'list',
    format: 'unordered',
    children: items.map((children) => ({ type: 'list-item', children })),
  };
}
export function ol(...items: any[][]): any {
  return {
    type: 'list',
    format: 'ordered',
    children: items.map((children) => ({ type: 'list-item', children })),
  };
}
export function quote(...children: any[]): any {
  return { type: 'quote', children };
}

// ── API helpers ─────────────────────────────────────────────

async function apiRequest(method: string, path: string, body?: any): Promise<any> {
  const url = `${STRAPI_URL}/api/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (method === 'DELETE' && res.status === 204) {
    return { success: true };
  }

  const json = await res.json();
  if (!res.ok) {
    console.error(JSON.stringify({ error: true, status: res.status, details: json }, null, 2));
    process.exit(1);
  }
  return json;
}

async function list(contentType: string) {
  const json = await apiRequest('GET', `${contentType}?populate=*&pagination[pageSize]=100&sort=createdAt:desc`);
  const entries = json.data.map((entry: any) => ({
    documentId: entry.documentId,
    slug: entry.slug,
    title: entry.title || entry.competitor || entry.slug,
    publishedAt: entry.publishedAt,
  }));
  console.log(JSON.stringify(entries, null, 2));
}

async function get(contentType: string, slug: string) {
  const json = await apiRequest('GET', `${contentType}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  if (!json.data || json.data.length === 0) {
    console.error(JSON.stringify({ error: true, message: `No ${contentType} found with slug "${slug}"` }));
    process.exit(1);
  }
  console.log(JSON.stringify(json.data[0], null, 2));
}

async function create(contentType: string, data: any) {
  const json = await apiRequest('POST', contentType, { data });
  console.log(JSON.stringify(json.data, null, 2));
}

async function update(contentType: string, documentId: string, data: any) {
  const json = await apiRequest('PUT', `${contentType}/${documentId}`, { data });
  console.log(JSON.stringify(json.data, null, 2));
}

async function del(contentType: string, documentId: string) {
  await apiRequest('DELETE', `${contentType}/${documentId}`);
  console.log(JSON.stringify({ success: true, deleted: documentId }));
}

async function publish(contentType: string, documentId: string) {
  const json = await apiRequest('PUT', `${contentType}/${documentId}?status=published`, { data: {} });
  console.log(JSON.stringify(json.data, null, 2));
}

async function unpublish(contentType: string, documentId: string) {
  const json = await apiRequest('PUT', `${contentType}/${documentId}?status=draft`, { data: {} });
  console.log(JSON.stringify(json.data, null, 2));
}

// ── CLI parsing ─────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const contentType = args[1];

  if (!command || !contentType) {
    console.error('Usage: npx tsx scripts/strapi-manage.ts <command> <content-type> [args] [--data \'<json>\']');
    console.error('Commands: list, get, create, update, delete, publish, unpublish');
    console.error('Content types: blog-posts, comparison-pages');
    process.exit(1);
  }

  // Parse --data flag
  let data: any = undefined;
  const dataIndex = args.indexOf('--data');
  if (dataIndex !== -1 && args[dataIndex + 1]) {
    try {
      data = JSON.parse(args[dataIndex + 1]);
    } catch (e) {
      console.error('Error: --data must be valid JSON');
      process.exit(1);
    }
  }

  // The identifier (slug or documentId) is args[2] unless it's --data
  const identifier = args[2] !== '--data' ? args[2] : undefined;

  return { command, contentType, identifier, data };
}

async function main() {
  const { command, contentType, identifier, data } = parseArgs();

  switch (command) {
    case 'list':
      await list(contentType);
      break;

    case 'get':
      if (!identifier) {
        console.error('Usage: get <content-type> <slug>');
        process.exit(1);
      }
      await get(contentType, identifier);
      break;

    case 'create':
      if (!data) {
        console.error('Usage: create <content-type> --data \'<json>\'');
        process.exit(1);
      }
      await create(contentType, data);
      break;

    case 'update':
      if (!identifier || !data) {
        console.error('Usage: update <content-type> <documentId> --data \'<json>\'');
        process.exit(1);
      }
      await update(contentType, identifier, data);
      break;

    case 'delete':
      if (!identifier) {
        console.error('Usage: delete <content-type> <documentId>');
        process.exit(1);
      }
      await del(contentType, identifier);
      break;

    case 'publish':
      if (!identifier) {
        console.error('Usage: publish <content-type> <documentId>');
        process.exit(1);
      }
      await publish(contentType, identifier);
      break;

    case 'unpublish':
      if (!identifier) {
        console.error('Usage: unpublish <content-type> <documentId>');
        process.exit(1);
      }
      await unpublish(contentType, identifier);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Valid commands: list, get, create, update, delete, publish, unpublish');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
