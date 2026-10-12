import { readFileSync } from 'node:fs';
import { afterEach,expect,it,vi } from 'vitest';
import { GameAudio } from '../src/audio';
const encoded=new Uint8Array(readFileSync('public/assets/audio/maze-korokoro.bmau')).buffer;
const instances:FakeAudio[]=[];
class FakeAudio {
  src='';hidden=false;dataset:Record<string,string>={};loop=false;volume=1;preload='';currentTime=0;
  play=vi.fn(async()=>{});pause=vi.fn();
  constructor(src=''){this.src=src;instances.push(this);}
}
function setup(){
  instances.length=0;
  let visibility=()=>{};
  const document={hidden:false,body:{append:vi.fn()},addEventListener:vi.fn((_name:string,fn:()=>void)=>{visibility=fn;})};
  vi.stubGlobal('Audio',FakeAudio);vi.stubGlobal('document',document);
  return {document,visibility:()=>visibility()};
}
afterEach(()=>{vi.unstubAllGlobals();vi.restoreAllMocks();});
it('loads only on user opt-in, uses loop/volume, reuses music and pauses on mute or hide',async()=>{
  const {document,visibility}=setup();
  const fetcher=vi.fn(async()=>({ok:true,arrayBuffer:async()=>encoded}));vi.stubGlobal('fetch',fetcher);
  const audio=new GameAudio(),music=instances[0];
  expect(audio.enabled).toBe(false);expect(fetcher).not.toHaveBeenCalled();
  expect(await audio.toggle()).toBe(true);expect(fetcher).toHaveBeenCalledOnce();
  expect(music.src).toMatch(/^blob:/);expect(music.loop).toBe(true);expect(music.volume).toBe(0.16);
  expect(music.play).toHaveBeenCalledOnce();
  document.hidden=true;visibility();expect(music.pause).toHaveBeenCalledOnce();
  document.hidden=false;visibility();expect(music.play).toHaveBeenCalledTimes(2);
  expect(await audio.toggle()).toBe(false);expect(music.pause).toHaveBeenCalledTimes(2);
  await audio.toggle();expect(fetcher).toHaveBeenCalledOnce();
});
it('does not start music when muted while the first download is pending',async()=>{
  setup();let resolve!: (value:unknown)=>void;
  vi.stubGlobal('fetch',()=>new Promise(done=>{resolve=done;}));
  const audio=new GameAudio(),starting=audio.toggle();
  expect(await audio.toggle()).toBe(false);
  resolve({ok:true,arrayBuffer:async()=>encoded});
  expect(await starting).toBe(false);expect(instances[0].play).not.toHaveBeenCalled();
});
it('stays muted after a load failure and allows the next user click to retry',async()=>{
  setup();const fetcher=vi.fn().mockResolvedValueOnce({ok:false}).mockResolvedValue({ok:true,arrayBuffer:async()=>encoded});
  vi.stubGlobal('fetch',fetcher);const audio=new GameAudio();
  expect(await audio.toggle()).toBe(false);expect(instances[0].play).not.toHaveBeenCalled();
  expect(await audio.toggle()).toBe(true);expect(fetcher).toHaveBeenCalledTimes(2);
});
