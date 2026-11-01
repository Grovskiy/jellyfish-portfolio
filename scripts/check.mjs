import { readFile, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { projects, archive } = JSON.parse(await readFile(join(root,'data/projects.json'),'utf8'));
const errors = [], ids = new Set();
for (const p of [...projects, ...archive]) {
  if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) errors.push(`Invalid project ID: ${p.id}`);
  if (ids.has(p.id)) errors.push(`Duplicate ID: ${p.id}`);
  ids.add(p.id);
  if (!p.title || !p.eyebrow) errors.push(`Missing title/type: ${p.id}`);
  if (!p.image || !p.alt) errors.push(`Missing media/alt: ${p.id}`);
  if (p.image) {
    if (!/^[a-z0-9-]+\.(webp|png|svg|jpg)$/.test(p.image)) errors.push(`Invalid media filename: ${p.image}`);
    else try { await access(join(root,'site/media',p.image)); } catch { errors.push(`Missing media: ${p.image}`); }
  }
  if (p.earlierImage) {
    if (!/^[a-z0-9-]+\.(webp|png|svg|jpg)$/.test(p.earlierImage)) errors.push(`Invalid earlier media filename: ${p.earlierImage}`);
    else try { await access(join(root,'site/media',p.earlierImage)); } catch { errors.push(`Missing earlier media: ${p.earlierImage}`); }
  }
}
if (!projects.some(p=>p.featured)) errors.push('No featured projects');
if (!archive.length) errors.push('Archive is empty');
for (const p of projects.filter(p=>p.featured)) {
  for (const key of ['summary','description','role','scope','disclosure','color']) if (!p[key]) errors.push(`Missing ${key}: ${p.id}`);
}
for (const p of [...projects, ...archive]) {
  if (p.livePreview && !p.demo) errors.push(`Missing demo for live preview: ${p.id}`);
  if (p.demo) {
    if (!/^demos\/[a-z0-9-]+\/$/.test(p.demo)) errors.push(`Invalid demo path: ${p.demo}`);
    else try { await access(join(root,'site',p.demo,'index.html')); } catch { errors.push(`Missing demo: ${p.demo}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${projects.length} featured records and ${archive.length} archive records with media.`);
