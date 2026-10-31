import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root,'dist');
const data = JSON.parse(await readFile(join(root,'data/projects.json'),'utf8'));
const read = path => readFile(join(out,path),'utf8');

test('home presents user-provided contact channels and the archive count', async () => {
  const html = await read('index.html');
  assert.match(html, /mailto:grovskiy@gmail\.com/);
  assert.match(html, /https:\/\/t\.me\/grovskiy/);
  assert.match(html, new RegExp(`${String(data.archive.length).padStart(2,'0')} PROJECTS IN THIS COLLECTION`));
  assert.doesNotMatch(html, /verstka_ua|verstka\.ua/i);
});
test('every featured project has a direct-loadable page and local media', async () => {
  const home = await read('index.html');
  for (const p of data.projects.filter(p=>p.featured)) {
    assert.ok(home.includes(`projects/${p.id}/`), `missing home link ${p.id}`);
    const page = await read(`projects/${p.id}/index.html`);
    assert.ok(page.includes('../../assets/style.css'));
    assert.ok(page.includes(`../../media/${p.image}`));
    assert.ok(page.includes('../../index.html#work'));
    await access(join(out,'media',p.image));
    if(p.demo) { assert.ok(page.includes(`../../${p.demo}`)); await access(join(out,p.demo,'index.html')); }
  }
});
test('archive entries have local media and distinct IDs', async () => {
  const seen = new Set(data.projects.map(p=>p.id));
  for (const p of data.archive) {
    assert.ok(!seen.has(p.id), `duplicate ID: ${p.id}`); seen.add(p.id);
    await access(join(out,'media',p.image));
    if (p.url) { await access(join(out,p.url,'index.html')); assert.ok((await read('index.html')).includes(`href="${p.url}"`)); }
  }
});

test('all generated local links, assets and fragment targets resolve', async () => {
  const { readdir, stat } = await import('node:fs/promises');
  const { dirname, resolve: resolvePath, sep } = await import('node:path');
  async function pages(dir) {
    const found = [];
    for (const entry of await readdir(dir,{withFileTypes:true})) {
      const path=join(dir,entry.name);
      if(entry.isDirectory()) found.push(...await pages(path));
      else if(entry.name.endsWith('.html')) found.push(path);
    }
    return found;
  }
  for (const page of await pages(out)) {
    const html=await readFile(page,'utf8');
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const raw=match[1].replaceAll('&amp;','&');
      if (/^(?:https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
      const [relative, fragment]=raw.split('#');
      const path=relative ? resolvePath(dirname(page),decodeURIComponent(relative)) : page;
      assert.ok(path===out || path.startsWith(out+sep), `link escapes dist: ${raw}`);
      let target=path;
      try { if((await stat(path)).isDirectory()) target=join(path,'index.html'); await access(target); }
      catch { assert.fail(`${page}: missing ${raw}`); }
      if(fragment && target.endsWith('.html')) {
        const targetHtml=await readFile(target,'utf8');
        assert.ok(targetHtml.includes(`id="${fragment}"`), `${page}: missing fragment ${raw}`);
      }
    }
  }
});

test('previously published school and trading URLs remain available', async () => {
  const school = await read('archive/shkola/index.html');
  const trading = await read('projects/financial-interface/index.html');
  assert.ok(school.includes('projects/shkola/'));
  assert.ok(school.includes('../../demos/school/'));
  assert.ok(trading.includes('archive/financial-interface/'));
});
