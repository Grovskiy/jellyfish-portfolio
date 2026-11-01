import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

// Include file paths as well as content so additions, deletions and renames
// invalidate a cover in the same way as an edit.
export async function hashDemo(directory) {
  const hash = createHash('sha256');
  async function visit(relative = '') {
    const entries = await readdir(join(directory, relative), { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await visit(name);
      else if (entry.isFile()) {
        const bytes = await readFile(join(directory, name));
        hash.update(`${name}\0${bytes.length}\0`);
        hash.update(bytes);
      }
    }
  }
  await visit();
  return hash.digest('hex');
}

export async function hashFile(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}
