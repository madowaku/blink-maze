// Runtime-only container. This discourages standalone audio-file reuse;
// it is not DRM and cannot prevent a determined browser user extracting audio.
export const MUSIC_KEY = new Uint8Array([46,183,19,79,208,53,160,91,132,63,249,17,105,202,88,226]);
export const MUSIC_HEADER = new TextEncoder().encode('BLINKBGM1');
export async function unpackMusic(bytes: ArrayBuffer): Promise<ArrayBuffer> {
  const encoded=new Uint8Array(bytes);
  if(encoded.length<MUSIC_HEADER.length+12+16||MUSIC_HEADER.some((byte,i)=>encoded[i]!==byte))throw Error('Invalid music container');
  const key=await crypto.subtle.importKey('raw',MUSIC_KEY,'AES-GCM',false,['decrypt']);
  return crypto.subtle.decrypt({name:'AES-GCM',iv:encoded.slice(MUSIC_HEADER.length,MUSIC_HEADER.length+12)},key,encoded.slice(MUSIC_HEADER.length+12));
}
