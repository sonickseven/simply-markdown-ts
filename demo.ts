const PORT = Number(Deno.args[0] ?? 8000);
const ROOT = new URL('./', import.meta.url);

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const server = Deno.serve({ port: PORT }, (req) => {
  const url = new URL(req.url);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/' || pathname === '') pathname = '/demo.html';

  const filePath = new URL(`.${pathname}`, ROOT);
  if (!filePath.href.startsWith(ROOT.href)) {
    return new Response('Forbidden', { status: 403 });
  }

  const ext = filePath.pathname.match(/\.[^./]+$/)?.[0] ?? '';
  const mime = MIME[ext] ?? 'application/octet-stream';

  return Deno.readFile(filePath)
    .then((body) => new Response(body, { headers: { 'content-type': mime } }))
    .catch(() => new Response('Not found', { status: 404 }));
});

console.log(`Demo running at http://localhost:${server.addr.port}/`);
