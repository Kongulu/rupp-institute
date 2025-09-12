import type { Handler } from '@netlify/functions';
import { sba } from './_supabaseAdmin';

export const handler: Handler = async (evt) => {
  if (evt.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  if ((evt.headers['x-app-secret'] || '') !== process.env.APP_SECRET) return { statusCode: 401, body: 'unauthorized' };

  const body = JSON.parse(evt.body || '{}');
  const { table, row } = body;
  const { error } = await sba.from(table).insert(row);
  if (error) return { statusCode: 400, body: error.message };
  return { statusCode: 200, body: 'ok' };
};
