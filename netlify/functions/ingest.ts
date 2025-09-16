import type { Handler } from '@netlify/functions';
import { sba } from './_supabaseAdmin';

const APP_SECRET = (process.env.APP_SECRET || '').trim();

const json = (statusCode: number, payload: Record<string, unknown>) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});

const header = (headers: Record<string, string | undefined> | undefined, name: string) => {
  if (!headers) return undefined;
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target) return value;
  }
  return undefined;
};

export const handler: Handler = async (evt) => {
  if (evt.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  if (!APP_SECRET) {
    return json(500, { error: 'Server misconfigured: APP_SECRET is not set.' });
  }

  const providedSecret = (header(evt.headers, 'x-app-secret') || '').trim();
  if (providedSecret !== APP_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  if (!evt.body) {
    return json(400, { error: 'Missing request body' });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(evt.body);
  } catch {
    return json(400, { error: 'Invalid JSON payload' });
  }

  if (typeof payload !== 'object' || payload === null) {
    return json(400, { error: 'Payload must be a JSON object.' });
  }

  const { table, row } = payload as { table?: unknown; row?: unknown };

  if (typeof table !== 'string' || !table.trim()) {
    return json(400, { error: 'A non-empty table name is required.' });
  }

  if (typeof row !== 'object' || row === null || Array.isArray(row)) {
    return json(400, { error: 'Row must be a JSON object.' });
  }

  const { error } = await sba.from(table.trim()).insert(row);
  if (error) {
    return json(400, { error: error.message });
  }

  return json(200, { ok: true });
};
