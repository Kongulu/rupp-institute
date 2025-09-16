import type { Handler } from '@netlify/functions';
import { sba } from './_supabaseAdmin';

const TTL_MIN = 60;

const json = (statusCode: number, payload: unknown) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});

const sanitizeTopic = (input: string) => {
  const clean = input.toLowerCase().replace(/[^a-z0-9\-]/g, '-');
  return clean.length > 0 ? clean.slice(0, 60) : 'ai-policy';
};

export const handler: Handler = async (evt) => {
  const rawTopic = evt.queryStringParameters?.topic || 'ai-policy';
  const topic = sanitizeTopic(rawTopic);
  const key = `news:${topic}`;

  const { data: hit, error: selectError } = await sba
    .from('ai_cache')
    .select('data,expires_at')
    .eq('cache_key', key)
    .maybeSingle();

  if (selectError) {
    return json(500, { error: `Failed to read cached news: ${selectError.message}` });
  }

  const now = new Date();
  if (hit && hit.expires_at && new Date(hit.expires_at) > now) {
    return json(200, hit.data);
  }

  // Placeholder content until RSS + OpenAI wired
  const summary = { topic, items: [{ title: `News for ${topic}`, url: '#', summary: 'placeholder' }] };

  const expiresAt = new Date(now.getTime() + TTL_MIN * 60000).toISOString();
  const { error: upsertError } = await sba
    .from('ai_cache')
    .upsert({ cache_key: key, data: summary, expires_at: expiresAt });

  if (upsertError) {
    return json(500, { error: `Failed to cache news: ${upsertError.message}` });
  }

  return json(200, summary);
};
