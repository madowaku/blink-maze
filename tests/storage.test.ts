import { expect,it } from 'vitest';
import { LEGACY_KEY,STORAGE_KEY,loadProgress,saveProgress } from '../src/storage';
it('handles missing, denied, malformed and quota-failing storage',()=>{
  expect(loadProgress()).toEqual({version:'0.2',current:0,cleared:[],language:'ja'});
  expect(loadProgress({getItem(){throw Error('denied');}})).toEqual(loadProgress());
  expect(loadProgress({getItem:()=>'{bad'})).toEqual(loadProgress());
  expect(saveProgress(loadProgress(),{setItem(){throw Error('full');}})).toBe(false);
});
it('sanitizes indices and clear identifiers for the expanded campaign',()=>{
  expect(loadProgress({getItem:()=>JSON.stringify({version:'0.2',current:99,cleared:['001','001','005','011','999',null],language:'en'})})).toEqual({version:'0.2',current:0,cleared:['001','005','011'],language:'en'});
});
it('keeps all previous edge-maze clears without clearing the discovery chapter',()=>{
  const cleared=['001','002','003','004','005'];
  const progress=loadProgress({getItem:()=>JSON.stringify({version:'0.2',current:4,cleared,language:'ja'})});
  expect(progress.cleared).toEqual(cleared);expect(progress.current).toBe(4);
  expect(loadProgress({getItem:()=>JSON.stringify({...progress,current:10})}).current).toBe(10);
});
it('preserves old progress, inheriting only locale',()=>{
  const map=new Map([[LEGACY_KEY,JSON.stringify({current:7,cleared:['001','008'],language:'en'})]]);
  const legacy=map.get(LEGACY_KEY);
  const progress=loadProgress({getItem:key=>map.get(key)??null});
  expect(progress).toEqual({version:'0.2',current:0,cleared:[],language:'en'});
  saveProgress(progress,{setItem:(key,value)=>{map.set(key,value);}});
  expect(map.get(LEGACY_KEY)).toBe(legacy);
  expect(map.has(STORAGE_KEY)).toBe(true);
});
it('does not reuse a stale version under the current key',()=>{
  expect(loadProgress({getItem:()=>JSON.stringify({version:'0.1',current:4,cleared:['001']})}).cleared).toEqual([]);
});
it('roundtrips new-version progress and locale',()=>{
  let saved='';
  const progress={version:'0.2' as const,current:4,cleared:['001','002'],language:'en' as const};
  expect(saveProgress(progress,{setItem:(_key,value)=>{saved=value;}})).toBe(true);
  expect(loadProgress({getItem:()=>saved})).toEqual(progress);
});
it('uses browser locale for a first visit while preserving an explicitly saved locale',()=>{
  expect(loadProgress(undefined,'en').language).toBe('en');
  expect(loadProgress({getItem:()=>JSON.stringify({version:'0.2',language:'ja'})},'en').language).toBe('ja');
});

