export type Phase = 0 | 1;
export type Action = 'U' | 'D' | 'L' | 'R' | 'T' | 'UNDO';
export type Move = Exclude<Action, 'T' | 'UNDO'>;
export type EdgeKind = 'stone' | 'open' | 'A' | 'B';
export type Rejection = 'wall' | 'budget' | 'finished' | 'empty';
export interface Connection { x: number; y: number; dir: 'R' | 'D'; kind: Exclude<EdgeKind, 'stone'> }
export interface Level {
  id: string; title: string; width: number; height: number;
  start: [number, number]; goal: [number, number]; blinkLimit: number; initialPhase: Phase;
  connections: Connection[]; verifiedSolution: string; verifiedActions: number; verifiedBlinks: number;
  chapter?: 'discovery';
}
export interface Snapshot { x: number; y: number; phase: Phase; blinksUsed: number; moves: number; completed: boolean }
export interface GameState extends Snapshot { levelId: string; undoStack: Snapshot[] }
export interface Transition { state: GameState; accepted: boolean; reason?: Rejection }
export interface Wall { id: string; x: number; y: number; dir: 'R' | 'D'; kind: EdgeKind }
const directions = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] } as const;
export function edgeKey(x: number, y: number, dir: 'R' | 'D'): string { return [x,y,dir].join(','); }
export function within(level: Level, x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < level.width && y < level.height;
}
export function validateLevel(level: Level): void {
  if (!level || typeof level.id !== 'string' || typeof level.title !== 'string') throw Error('Invalid level identity');
  if (!Number.isInteger(level.width) || !Number.isInteger(level.height) || level.width < 1 || level.height < 1 || level.width > 32 || level.height > 32) throw Error('Invalid dimensions: '+level.id);
  for (const point of [level.start, level.goal]) {
    if (!Array.isArray(point) || point.length !== 2 || !within(level,point[0],point[1])) throw Error('Invalid endpoint: '+level.id);
  }
  if (level.start[0] === level.goal[0] && level.start[1] === level.goal[1]) throw Error('Identical endpoints: '+level.id);
  if (!Number.isInteger(level.blinkLimit) || level.blinkLimit < 0 || ![0,1].includes(level.initialPhase)) throw Error('Invalid initial rules: '+level.id);
  if (!Array.isArray(level.connections)) throw Error('Invalid connections: '+level.id);
  const seen = new Set<string>();
  for (const edge of level.connections) {
    if (!edge || !['R','D'].includes(edge.dir) || !['open','A','B'].includes(edge.kind) || !within(level,edge.x,edge.y)) throw Error('Invalid edge: '+level.id);
    if (!within(level,edge.x+(edge.dir==='R'?1:0),edge.y+(edge.dir==='D'?1:0))) throw Error('Edge leaves board: '+level.id);
    const key = edgeKey(edge.x,edge.y,edge.dir);
    if (seen.has(key)) throw Error('Duplicate edge: '+level.id);
    seen.add(key);
  }
}
export function blocks(kind: EdgeKind, phase: Phase): boolean {
  return kind === 'stone' || (kind === 'A' && phase === 0) || (kind === 'B' && phase === 1);
}
export function edgeBetween(level: Level, x: number, y: number, nx: number, ny: number): EdgeKind {
  if (!within(level,x,y) || !within(level,nx,ny) || Math.abs(nx-x)+Math.abs(ny-y)!==1) return 'stone';
  const dir = nx===x ? 'D' : 'R';
  const ex = Math.min(x,nx), ey = Math.min(y,ny);
  return level.connections.find(edge=>edge.x===ex && edge.y===ey && edge.dir===dir)?.kind ?? 'stone';
}
// Each boundary is emitted once. Exterior x=-1/y=-1 are renderer coordinates only.
export function walls(level: Level): Wall[] {
  const result: Wall[] = [];
  for (let y=0;y<level.height;y++) for (let x=-1;x<level.width;x++) {
    result.push({id:edgeKey(x,y,'R'),x,y,dir:'R',kind:edgeBetween(level,x,y,x+1,y)});
  }
  for (let y=-1;y<level.height;y++) for (let x=0;x<level.width;x++) {
    result.push({id:edgeKey(x,y,'D'),x,y,dir:'D',kind:edgeBetween(level,x,y,x,y+1)});
  }
  return result;
}
export function createState(level: Level): GameState {
  validateLevel(level);
  return {levelId:level.id,x:level.start[0],y:level.start[1],phase:level.initialPhase,blinksUsed:0,moves:0,completed:false,undoStack:[]};
}
function snapshot(state: GameState): Snapshot {
  const {x,y,phase,blinksUsed,moves,completed} = state;
  return {x,y,phase,blinksUsed,moves,completed};
}
export function blinkRejection(level: Level, state: Snapshot): Rejection | undefined {
  if (state.completed) return 'finished';
  if (state.blinksUsed >= level.blinkLimit) return 'budget';
}
export function transition(level: Level, state: GameState, action: Action): Transition {
  const reject = (reason: Rejection): Transition => ({state,accepted:false,reason});
  if (state.completed) return reject('finished');
  if (action === 'UNDO') {
    const previous = state.undoStack.at(-1);
    if (!previous) return reject('empty');
    return {accepted:true,state:{...state,...previous,undoStack:state.undoStack.slice(0,-1)}};
  }
  if (action === 'T') {
    const reason = blinkRejection(level,state);
    if (reason) return reject(reason);
    return {accepted:true,state:{...state,phase:(1-state.phase) as Phase,blinksUsed:state.blinksUsed+1,undoStack:[...state.undoStack,snapshot(state)]}};
  }
  const [dx,dy] = directions[action];
  const x=state.x+dx,y=state.y+dy;
  if (blocks(edgeBetween(level,state.x,state.y,x,y),state.phase)) return reject('wall');
  return {accepted:true,state:{...state,x,y,moves:state.moves+1,completed:x===level.goal[0]&&y===level.goal[1],undoStack:[...state.undoStack,snapshot(state)]}};
}
// QA only; gameplay never invokes a solver.
export function solve(level: Level): string | null {
  const initial=createState(level);
  const queue:{state:GameState;path:string}[]=[{state:initial,path:''}];
  const key=(s:GameState)=>[s.x,s.y,s.phase,s.blinksUsed].join(',');
  const seen=new Set([key(initial)]);
  for(let head=0;head<queue.length;head++) {
    const {state,path}=queue[head];
    if(state.completed)return path;
    for(const action of ['R','L','U','D','T'] as const) {
      const result=transition(level,state,action);
      if(!result.accepted||seen.has(key(result.state)))continue;
      seen.add(key(result.state));queue.push({state:{...result.state,undoStack:[]},path:path+action});
    }
  }
  return null;
}

