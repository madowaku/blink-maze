import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { levels } from '../src/data';
import { createState, solve, transition, type Action, type GameState, type Level } from '../src/core';
import { discoveries, hints, titles } from '../src/text';

function continuation(level:Level,start:GameState):string|null {
  const queue=[{state:start,path:''}],key=(s:GameState)=>[s.x,s.y,s.phase,s.blinksUsed].join(',');
  const seen=new Set([key(start)]);
  for(let head=0;head<queue.length;head++) {
    const {state,path}=queue[head];if(state.completed)return path;
    for(const action of ['R','L','U','D','T'] as const) {
      const result=transition(level,state,action);
      if(!result.accepted||seen.has(key(result.state)))continue;
      seen.add(key(result.state));queue.push({state:{...result.state,undoStack:[]},path:path+action});
    }
  }
  return null;
}
function replay(level:Level,path:string):GameState {
  let state=createState(level);
  for(const action of path) {
    const result=transition(level,state,action as Action);
    expect(result.accepted,level.id+' '+action).toBe(true);state=result.state;
  }
  return state;
}
const expectations=[
  {id:'006',blinks:0,wrong:'T',critical:'0,1,D'},
  {id:'007',blinks:1,wrong:'RTR',critical:'1,1,D'},
  {id:'008',blinks:2,wrong:'TRTR',critical:'0,0,D'},
  {id:'009',blinks:1,wrong:'UUTR',critical:'0,2,D'},
  {id:'010',blinks:1,wrong:'DTDR',critical:'0,1,D'},
  {id:'011',blinks:2,wrong:'TRTR',critical:'0,1,D'},
];
describe.each(expectations)('Discovery $id',({id,blinks,wrong,critical})=>{
  const level=levels.find(level=>level.id===id)!;
  it('needs the intended minimum blink count, rather than one per eye',()=>{
    for(let limit=0;limit<blinks;limit++)expect(solve({...level,blinkLimit:limit})).toBeNull();
    const path=solve({...level,blinkLimit:blinks});expect(path).not.toBeNull();
    expect(replay(level,path!).blinksUsed).toBe(blinks);
  });
  it('makes the tempting wrong order unsolvable until the player undoes it',()=>{
    const stuck=replay(level,wrong);
    expect(continuation(level,stuck)).toBeNull();
    let restored=stuck;
    while(restored.undoStack.length)restored=transition(level,restored,'UNDO').state;
    expect(restored).toEqual(createState(level));expect(continuation(level,restored)).not.toBeNull();
  });
  it('requires the discovery route, with no unintended shortcut',()=>{
    expect(solve({...level,connections:level.connections.filter(edge=>[edge.x,edge.y,edge.dir].join(',')!==critical)})).toBeNull();
  });
});
it('preserves the exact original five edge puzzles',()=>{
  const previous=JSON.parse(readFileSync('docs/archive/v0.2/levels.json','utf8'));
  expect(levels.slice(0,5)).toEqual(previous.levels);
});
it('keeps localized titles and three deliberate hint steps for every discovery',()=>{
  for(const locale of ['ja','en'] as const) {
    expect(titles[locale]).toHaveLength(levels.length);expect(hints[locale]).toHaveLength(levels.length);
    for(let i=5;i<levels.length;i++){
      expect(hints[locale][i]).toHaveLength(3);expect(discoveries[locale][i]).toBeTruthy();
      expect(new Set(hints[locale][i]).size).toBe(3);
    }
  }
});
it('starts another morning with the opposite eyes and reaches the exit after one blink',()=>{
  const level=levels.find(level=>level.id==='010')!;
  expect(createState(level).phase).toBe(1);
  expect(replay(level,level.verifiedSolution)).toMatchObject({completed:true,phase:0,blinksUsed:1});
});
it('enters the final central exit from the far side',()=>{
  const level=levels.at(-1)!;
  const before=replay(level,level.verifiedSolution.slice(0,-1));
  expect([before.x,before.y]).toEqual([level.goal[0]+1,level.goal[1]]);
});
