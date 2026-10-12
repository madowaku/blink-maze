// Authored paths, not randomly generated layouts. Only used to author this chapter.
import { readFileSync, writeFileSync } from 'node:fs';
import { createState, solve, transition } from '../src/core.ts';
const data = JSON.parse(readFileSync(new URL('../src/levels.json', import.meta.url), 'utf8'));
const additions = [];
function stage(id, title, width, height, start, goal, blinkLimit, initialPhase, intent) {
  const level = { id, title, width, height, start, goal, blinkLimit, initialPhase, connections: [], intent };
  additions.push(level);
  return level;
}
function path(level, points, kinds) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x,y] = points[i], [nx,ny] = points[i+1];
    if (Math.abs(nx-x)+Math.abs(ny-y)!==1) throw Error('Non-adjacent path');
    const edge = { x:Math.min(x,nx), y:Math.min(y,ny), dir:x===nx?'D':'R', kind:kinds[i]??'open' };
    const existing = level.connections.find(e=>e.x===edge.x&&e.y===edge.y&&e.dir===edge.dir);
    if (existing && existing.kind!==edge.kind) throw Error('Conflicting path');
    if (!existing) level.connections.push(edge);
  }
}
let l=stage('006','THE QUIET CORRIDOR',5,3,[0,1],[4,1],1,0,'BLINKを使い切る必要はない。青の近道は2回必要だが、眠った琥珀の回廊なら0回で届く。');
path(l,[[0,1],[1,1],[2,1],[3,1],[4,1]],['A','open','B','open']);
path(l,[[0,1],[0,2],[1,2],[2,2],[3,2],[4,2],[4,1]],['open','B','open','B','open','open']);

l=stage('007','ONE SIGNAL',5,4,[0,1],[4,1],1,0,'2つの琥珀を先に抜ければ、曲がりくねった5つの青の壁を1回の合図で通せる。');
path(l,[[0,1],[1,1],[2,1],[3,1],[4,1]],['B','A','B','A']);
path(l,[[1,1],[1,2],[2,2],[2,3],[3,3],[4,3],[4,2],[4,1]],['B','A','A','open','A','A','A']);

l=stage('008','THE LAST THRESHOLD',5,3,[0,1],[4,1],2,0,'出口直前の琥珀は最後にphase0が必要。青を抜けた先から出口側へ戻す2回目のBLINKを逆算する。');
path(l,[[0,1],[1,1],[2,1],[3,1],[4,1]],['A','B','A','B']);
path(l,[[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1]],['B','B','A','A','open','B']);
path(l,[[0,1],[0,2],[1,2],[2,2],[3,2],[4,2],[4,1]],['A','B','A','B','open','B']);

l=stage('009','TWO LONG ROADS',7,5,[0,2],[6,2],1,0,'同じ長さの迂回路でも目の並びが違う。上はAABB AAで3回、下はBB AAAAで1回。壁の数より色が切り替わる回数を見る。');
path(l,[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]],['A','B','A','B','A','B']);
path(l,[[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2]],['open','open','A','A','B','B','A','A','open','open']);
path(l,[[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[6,3],[6,2]],['open','open','B','B','A','A','A','A','open','open']);

l=stage('010','ANOTHER MORNING',5,5,[0,2],[4,2],1,1,'初期状態が逆。青=常に閉塞と思い込まず、いま開閉している目を見る。上のAA BBの道なら1回。');
path(l,[[0,2],[1,2],[2,2],[3,2],[4,2]],['A','B','A','B']);
path(l,[[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2]],['open','A','A','open','B','B','open','open']);
path(l,[[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2]],['open','B','B','open','A','B','open','open']);

l=stage('011','THE OTHER SIDE',7,5,[0,2],[3,2],2,0,'近い出口を左から目指すとABAで3回必要。いったん出口を通り過ぎる外周を選び、右の琥珀から入れば2回。');
path(l,[[0,2],[1,2],[2,2],[3,2]],['A','B','A']);
path(l,[[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2],[5,2],[4,2],[3,2]],['B','open','B','A','A','open','open','B','open','open','B','B','B']);
path(l,[[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[6,3],[6,2]],['B','open','A','B','A','B','A','B','open','open']);

for (const level of additions) {
  const route=solve(level);
  if (!route) throw Error('Unsolvable '+level.id);
  let state=createState(level);
  for (const action of route) state=transition(level,state,action).state;
  Object.assign(level,{verifiedSolution:route,verifiedActions:route.length,verifiedBlinks:state.blinksUsed,chapter:'discovery'});
  console.log(level.id,route,route.length,state.blinksUsed);
}
// Reruns replace only this authored chapter. Original tutorial data stays intact.
data.levels = [...data.levels.filter(l=>!additions.some(n=>n.id===l.id)),...additions];
data.version='0.3';
writeFileSync(new URL('../src/levels.json',import.meta.url),JSON.stringify(data,null,2)+'\n');
