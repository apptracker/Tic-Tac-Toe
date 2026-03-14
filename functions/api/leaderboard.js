const CACHE_KEY = 'https://apptrackerhk.pages.dev/__lb_data__';

export async function onRequest(context) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: cors });
  }

  const cache = caches.default;
  const cacheReq = new Request(CACHE_KEY);

  if (context.request.method === 'GET') {
    const game = new URL(context.request.url).searchParams.get('game') || 'space';
    const cached = await cache.match(cacheReq);
    let all = {};
    if (cached) {
      try { all = await cached.json(); } catch(e) { all = {}; }
    }
    const entries = all[game] || [];
    return new Response(JSON.stringify(entries), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }

  if (context.request.method === 'POST') {
    const body = await context.request.json();
    const { game, name, score, hits, combo, wave } = body;
    if (!game || !name || score === undefined) {
      return new Response(JSON.stringify({ error: 'missing fields' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    const cached = await cache.match(cacheReq);
    let all = {};
    if (cached) {
      try { all = await cached.json(); } catch(e) { all = {}; }
    }

    if (!all[game]) all[game] = [];
    all[game].push({ name, score, hits: hits || 0, combo: combo || 0, wave: wave || 0, date: new Date().toISOString().slice(0, 10) });
    all[game].sort((a, b) => b.score - a.score);
    all[game] = all[game].slice(0, 50);

    const resp = new Response(JSON.stringify(all), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=31536000' }
    });
    context.waitUntil(cache.put(cacheReq, resp.clone()));

    return new Response(JSON.stringify(all[game]), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405, headers: cors });
}
