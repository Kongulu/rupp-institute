import type { Handler } from '@netlify/functions';
import { sba } from './_supabaseAdmin';

const TTL_MIN = 60;

export const handler: Handler = async (evt) => {
  const topic = (evt.queryStringParameters?.topic || 'ai-policy').toLowerCase();
  const key = `news:${topic}`;

  const { data: hit } = await sba.from('ai_cache').select('data,expires_at').eq('cache_key', key).maybeSingle();
  const now = new Date();
  if (hit && new Date(hit.expires_at) > now) {
    return ok(hit.data);
  }

  // Placeholder content until RSS + OpenAI wired
  const summary = { topic, items: [{ title: `News for ${topic}`, url: '#', summary: 'placeholder' }] };

  const exp = new Date(now.getTime() + TTL_MIN * 60000).toISOString();
  await sba.from('ai_cache').upsert({ cache_key: key, data: summary, expires_at: exp });

  return ok(summary);
};

const ok = (data: any) => ({ statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
