/* Local preview server for this site.
 *
 *     node scripts/dev-server.mjs          → http://localhost:8080
 *     node scripts/dev-server.mjs 3000     → a different port
 *
 * USE THIS AND NOT `python3 -m http.server`.
 *
 * The film drives video by seeking — it sets currentTime from scroll position rather than
 * playing. Seeking needs HTTP Range: the browser asks for a byte span, the server must answer
 * 206 Partial Content. Python's http.server ignores Range and answers 200 with the whole file,
 * so every clip sits frozen on its first frame and the film looks completely broken when there
 * is nothing wrong with it. That cost a day once already.
 *
 * No dependencies. Node 18+.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT = Number(process.argv[2]) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  const file = path.join(ROOT, rel);
  // Never serve outside the project, whatever the URL claims.
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end(`404  ${rel}`);
  }

  const size = fs.statSync(file).size;
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;

  // THE POINT OF THIS FILE. A Range request must get 206 and only the bytes asked for.
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (m) {
      let start = m[1] ? Number(m[1]) : 0;
      let end = m[2] ? Number(m[2]) : size - 1;
      if (end >= size) end = size - 1;
      if (start > end || start >= size) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}` });
        return res.end();
      }
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': type,
      });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
  }

  res.writeHead(200, { 'Content-Length': size, 'Content-Type': type, 'Accept-Ranges': 'bytes' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Wodapalooza Mexico City — local preview`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Serving ${ROOT}`);
  console.log(`  Range requests answered with 206, so the film scrubs correctly.\n`);
  console.log(`  Check it yourself:`);
  console.log(`    curl -s -o /dev/null -w '%{http_code}\\n' -r 0-99 \\`);
  console.log(`      http://localhost:${PORT}/media/scrub/s08-logo-close.mp4`);
  console.log(`  206 is correct. 200 means the server is lying and video will not seek.\n`);
});
