import { describe,expect,it } from 'vitest';
import { levels } from '../src/data';
import { blocks,createState,edgeBetween,solve,transition,validateLevel,walls,type Action,type Level } from '../src/core';
describe.each(levels)('Edge stage $id',level=>{
  it('validates data and initializes from level rules',()=>{
    expect(()=>validateLevel(level)).not.toThrow();
    expect(createState(level)).toMatchObject({x:level.start[0],y:level.start[1],phase:level.initialPhase,blinksUsed:0,completed:false});
  });
  it('replays the exact supplied solution within budget',()=>{
    let state=createState(level);
    for(const action of level.verifiedSolution) {
      const result=transition(level,state,action as Action);
      expect(result.accepted,'Rejected '+action).toBe(true);state=result.state;
    }
    expect([state.x,state.y]).toEqual(level.goal);
    expect(state.completed).toBe(true);
    expect(state.blinksUsed).toBe(level.verifiedBlinks);
    expect(state.moves+state.blinksUsed).toBe(level.verifiedActions);
  });
  it('independently finds a shortest route by BFS',()=>{
    const route=solve(level);
    expect(route).not.toBeNull();expect(route?.length).toBe(level.verifiedActions);
  });
  it('normalizes forward and reverse movement to the same boundary',()=>{
    for(const edge of level.connections) {
      const nx=edge.x+(edge.dir==='R'?1:0),ny=edge.y+(edge.dir==='D'?1:0);
      expect(edgeBetween(level,edge.x,edge.y,nx,ny)).toBe(edge.kind);
      expect(edgeBetween(level,nx,ny,edge.x,edge.y)).toBe(edge.kind);
    }
  });
  it('emits every boundary exactly once, including the fixed perimeter',()=>{
    const edges=walls(level);
    expect(edges).toHaveLength((level.width+1)*level.height+(level.height+1)*level.width);
    expect(new Set(edges.map(edge=>edge.id)).size).toBe(edges.length);
    for(const edge of edges.filter(edge=>edge.x===-1||edge.y===-1||(edge.dir==='R'?edge.x===level.width-1:edge.y===level.height-1)))expect(edge.kind).toBe('stone');
  });
  it('allows blinking from every floor cell with remaining budget',()=>{
    const start=createState(level);
    for(let y=0;y<level.height;y++)for(let x=0;x<level.width;x++){
      if(x===level.goal[0]&&y===level.goal[1])continue;
      const result=transition(level,{...start,x,y},'T');
      expect(result.accepted).toBe(true);expect(result.state.phase).toBe(1-level.initialPhase);
      expect([result.state.x,result.state.y]).toEqual([x,y]);
    }
  });
});
it('blocks both eye families in complementary phases',()=>{
  expect([blocks('stone',0),blocks('open',1),blocks('A',0),blocks('A',1),blocks('B',0),blocks('B',1)]).toEqual([true,false,true,false,false,true]);
});
it('allows crossing sleeping amber before the first blink, then blocks it',()=>{
  const level=levels[2],start=createState(level);
  expect(transition(level,start,'R').accepted).toBe(true);
  const flipped=transition(level,start,'T').state;
  expect(transition(level,flipped,'R')).toEqual({state:flipped,accepted:false,reason:'wall'});
});
it('rejects outside and undefined edges without consuming history',()=>{
  const level=levels[3],state=createState(level);
  expect(transition(level,state,'U')).toEqual({state,accepted:false,reason:'wall'});
  expect(transition(level,state,'L')).toEqual({state,accepted:false,reason:'wall'});
  expect(edgeBetween(level,0,1,1,2)).toBe('stone');
  expect(state.undoStack).toHaveLength(0);
});
it('restores player, phase and budget in reverse order without mutation',()=>{
  const level=levels[1],initial=createState(level);
  const moved=transition(level,initial,'R').state;
  const flipped=transition(level,moved,'T').state;
  const crossed=transition(level,flipped,'R').state;
  expect(transition(level,crossed,'UNDO').state).toEqual(flipped);
  expect(transition(level,flipped,'UNDO').state).toEqual(moved);
  expect(transition(level,moved,'UNDO').state).toEqual(initial);
  expect(initial.phase).toBe(0);expect(initial.undoStack).toHaveLength(0);
});
it('rejects empty undo, zero budget and excess blinks without changing state',()=>{
  const level=levels[0],state=createState(level),flipped=transition(level,state,'T').state;
  expect(transition(level,state,'UNDO').reason).toBe('empty');
  expect(transition(level,flipped,'T')).toEqual({state:flipped,accepted:false,reason:'budget'});
  const zero={...level,blinkLimit:0};
  expect(transition(zero,createState(zero),'T').reason).toBe('budget');
  expect(transition(level,flipped,'UNDO').state.blinksUsed).toBe(0);
});
it('initializes and restarts a phase-1 level correctly',()=>{
  const level={...levels[0],initialPhase:1 as const};
  expect(createState(level).phase).toBe(1);
  const changed=transition(level,createState(level),'T').state;
  expect(changed.phase).toBe(0);expect(createState(level).phase).toBe(1);
});
it('halts all gameplay after reaching the goal',()=>{
  const level=levels[0];let state=createState(level);
  for(const action of level.verifiedSolution)state=transition(level,state,action as Action).state;
  for(const action of ['U','R','T','UNDO'] as const)expect(transition(level,state,action).reason).toBe('finished');
});
it('detects an unsolvable maze with no automatic game rule changes',()=>{
  expect(solve({...levels[0],connections:[],blinkLimit:0})).toBeNull();
});
const base=levels[0];
const invalids=[
  {...base,width:0},{...base,height:1.5},{...base,start:[-1,0]},{...base,goal:[4,0]},
  {...base,start:base.goal},{...base,blinkLimit:-1},{...base,initialPhase:2},
  {...base,connections:[...base.connections,base.connections[0]]},
  {...base,connections:[{x:3,y:0,dir:'R',kind:'open'}]},
  {...base,connections:[{x:0,y:0,dir:'D',kind:'open'}]},
  {...base,connections:[{x:0.5,y:0,dir:'R',kind:'A'}]},
  {...base,connections:[{x:0,y:0,dir:'L',kind:'A'}]},
  {...base,connections:[{x:0,y:0,dir:'R',kind:'stone'}]},
];
it.each(invalids)('rejects malformed edge-level data %#',invalid=>{
  expect(()=>validateLevel(invalid as unknown as Level)).toThrow();
});

