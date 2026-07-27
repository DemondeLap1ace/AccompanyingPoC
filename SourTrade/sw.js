
const pending = new Map();

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('message', e => {
  const d = e.data || {};

  if (d.type === 'heartbeat') {
    if (e.source) e.source.postMessage({ type: 'heartbeat-ack', ts: d.ts });
    return;
  }

  if (d.action === 'open') {
    const port = e.ports[0];
    const entry = { filename: d.filename, chunks: [], controller: null, closed: false };
    pending.set(d.url, entry);

    port.onmessage = ev => {
      const m = ev.data || {};
      if (m.action === 'write') {
        const chunk = m.data instanceof Uint8Array ? m.data : new Uint8Array(m.data);
        if (entry.controller) entry.controller.enqueue(chunk);
        else entry.chunks.push(chunk);
      } else if (m.action === 'close') {
        if (entry.controller) { entry.controller.close(); pending.delete(d.url); }
        else entry.closed = true;
      }
    };

    port.postMessage({ action: 'open-ack', url: d.url });
  }
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith('/__dl/')) return;

  const entry = pending.get(url.href);
  if (!entry) return;

  const stream = new ReadableStream({
    start(controller) {
      entry.controller = controller;
      for (const ch of entry.chunks) controller.enqueue(ch);
      entry.chunks = [];
      if (entry.closed) { controller.close(); pending.delete(url.href); }
    }
  });

  e.respondWith(new Response(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${entry.filename}"`,
      'X-PoC': 'streamsaver-style-sw-download'
    }
  }));
});
