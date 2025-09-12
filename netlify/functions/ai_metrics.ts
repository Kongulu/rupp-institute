import type { Handler } from '@netlify/functions';
export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      deployedAt: new Date().toISOString(),
      pages: ['/', '/login', '/documents', '/news', '/metrics']
    })
  };
};
