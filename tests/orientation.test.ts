import { expect,it } from 'vitest';
import { blocks,createState,edgeBetween,transition,type Level } from '../src/core';
const level:Level={id:'QA',title:'Orientation fixture',width:2,height:2,start:[0,0],goal:[1,1],blinkLimit:1,initialPhase:0,connections:[{x:0,y:0,dir:'D',kind:'A'},{x:1,y:0,dir:'D',kind:'B'},{x:0,y:0,dir:'R',kind:'open'},{x:0,y:1,dir:'R',kind:'open'}],verifiedSolution:'RD',verifiedActions:2,verifiedBlinks:0};
it('uses the same horizontal eye boundary when approaching from above or below',()=>{
  expect(edgeBetween(level,0,0,0,1)).toBe('A');
  expect(edgeBetween(level,0,1,0,0)).toBe('A');
  const state=createState(level);
  expect(transition(level,state,'D').accepted).toBe(false);
  const flipped=transition(level,state,'T').state;
  expect(transition(level,flipped,'D').accepted).toBe(true);
  expect(blocks(edgeBetween(level,1,0,1,1),0)).toBe(false);
  expect(blocks(edgeBetween(level,1,1,1,0),1)).toBe(true);
});
