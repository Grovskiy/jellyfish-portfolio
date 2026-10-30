import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const base = resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2' };
createServer(async (req,res) => {
 try {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/jellyfish-portfolio\//,'/');
  let file = resolve(base, '.' + pathname);
  if (file !== base && !file.startsWith(base + sep)) throw new Error('invalid');
  if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
  const contents = await readFile(file); res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream'}); res.end(contents);
 } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173/jellyfish-portfolio/'));
