import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { MUSIC_KEY, MUSIC_HEADER } from '../src/music-container.ts';
const input=process.argv[2];
if(!input)throw Error('Provide the locally downloaded, licensed MP3 path.');
const root=resolve(import.meta.dirname,'..');
const raw=readFileSync(input),iv=randomBytes(12);
const cipher=createCipheriv('aes-128-gcm',MUSIC_KEY,iv);
const container=Buffer.concat([MUSIC_HEADER,iv,cipher.update(raw),cipher.final(),cipher.getAuthTag()]);
const output=resolve(root,'public/assets/audio/maze-korokoro.bmau');
writeFileSync(output,container);
mkdirSync(resolve(root,'docs/audio'),{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
writeFileSync(resolve(root,'docs/audio/music-provenance.json'),JSON.stringify({
  checked:'2026-10-12',title:'迷わず進め！迷宮コロコロ',author:'こーち',
  source:'https://opentracks.com/bgm/detail/16572',license:'https://opentracks.com/help/articles/license/',
  creator:'https://opentracks.com/creator/detail/328',original:{path:resolve(input),bytes:raw.length,sha256:hash(raw)},
  shipped:{path:'public/assets/audio/maze-korokoro.bmau',bytes:container.length,sha256:hash(container)},
  processing:'AES-128-GCM container conversion. Decrypted MP3 is byte-identical; no audio re-encoding. Runtime volume 0.16. Original MP3 is not shipped.',
},null,2)+'\n');
console.log('Converted game BGM:',container.length,'bytes; original SHA-256:',hash(raw));
