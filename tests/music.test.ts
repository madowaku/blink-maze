import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { expect,it } from 'vitest';
import { MUSIC_HEADER,unpackMusic } from '../src/music-container';
const encoded=readFileSync('public/assets/audio/maze-korokoro.bmau');
const buffer=()=>new Uint8Array(encoded).buffer;
it('decodes the game container back to the licensed original without changing audio',async()=>{
  const decoded=await unpackMusic(buffer());
  const provenance=JSON.parse(readFileSync('docs/audio/music-provenance.json','utf8'));
  expect(decoded.byteLength).toBe(provenance.original.bytes);
  expect(createHash('sha256').update(new Uint8Array(decoded)).digest('hex')).toBe(provenance.original.sha256);
  expect(new TextDecoder().decode(encoded.slice(0,MUSIC_HEADER.length))).toBe('BLINKBGM1');
});
it('rejects truncated, invalid and tampered containers',async()=>{
  await expect(unpackMusic(new Uint8Array(3).buffer)).rejects.toThrow();
  const invalid=new Uint8Array(encoded);invalid[0]^=1;
  await expect(unpackMusic(invalid.buffer)).rejects.toThrow();
  const tampered=new Uint8Array(encoded);tampered[tampered.length-20]^=1;
  await expect(unpackMusic(tampered.buffer)).rejects.toThrow();
});
