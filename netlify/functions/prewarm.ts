import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  const topics = ['ai-policy','open-source','research'];
  await Promise.all(topics.map(t =>
    fetch(`https://${process.env.URL}/.netlify/functions/ai_news?topic=${t}`).catch(()=>{})
  ));
  return { statusCode: 200, body: 'prewarmed' };
};
