import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(import.meta.dirname, '..');
function walk(dir) { return readdirSync(dir).flatMap(name => { const path = resolve(dir, name); return statSync(path).isDirectory() ? walk(path) : [path]; }); }
const files = [...walk(resolve(root, 'public')), ...walk(resolve(root, 'docs/art')), ...walk(resolve(root,'docs/audio')), resolve(root, 'docs/reference.png'), resolve(root,'docs/reference-v0.2.png')];
const manifest = {
  version: '0.3', checked: '2026-10-12',
  files: files.map(path => ({ path: relative(root, path).replaceAll('\\','/'), bytes: statSync(path).size, sha256: createHash('sha256').update(readFileSync(path)).digest('hex'), shipped: path.startsWith(resolve(root, 'public')) })),
};
writeFileSync(resolve(root, 'docs/asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`${files.length} files recorded with SHA-256.`);
