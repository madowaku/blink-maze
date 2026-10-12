import { blocks, walls, type Level, type Snapshot, type Wall } from './core';
import { assets } from './assets';
import type { Language } from './storage';

export function eyeImage(family:'A'|'B',phase:Snapshot['phase']):string {
  return family==='A' ? (phase===0?assets.blueOpen:assets.blueClosed) : (phase===0?assets.amberClosed:assets.amberOpen);
}
function image(src:string,className=''):string { return `<img class="${className}" src="${src}" alt="" draggable="false" aria-hidden="true">`; }
function renderWall(edge:Wall,level:Level,state:Snapshot,language:Language):string {
  if(edge.kind==='open')return '';
  const vertical=edge.dir==='R';
  const eye=edge.kind==='A'||edge.kind==='B';
  const blocked=blocks(edge.kind,state.phase);
  const left=(vertical?edge.x+1:edge.x)/level.width*100;
  const top=(vertical?edge.y:edge.y+1)/level.height*100;
  const family=edge.kind==='A'?(language==='ja'?'青い目':'Blue eye'):(language==='ja'?'琥珀の目':'Amber eye');
  const label=eye?`${family}: ${blocked?(language==='ja'?'開眼、石壁あり':'open, blocking wall'):(language==='ja'?'閉眼、通路':'closed, passage')}`:(language==='ja'?'固定の石壁':'Fixed stone wall');
  return `<div class="edge ${vertical?'vertical':'horizontal'} ${eye?'eyed':'fixed'} ${blocked?'blocking':'passable'}" style="left:${left}%;top:${top}%" data-edge="${edge.id}" data-kind="${edge.kind}" data-dir="${edge.dir}" data-blocked="${blocked}" role="img" aria-label="${label}"><span class="wall-piece first">${image(assets.wall)}</span><span class="wall-piece last">${image(assets.wall)}</span>${eye?image(eyeImage(edge.kind as 'A'|'B',state.phase),'wall-eye'):''}</div>`;
}
export function renderBoard(level:Level,state:Snapshot,language:Language,title:string):string {
  const floors=Array.from({length:level.width*level.height},(_,index)=>{
    const x=index%level.width,y=Math.floor(index/level.width);
    return `<div class="floor-cell" data-cell="${x},${y}">${image(assets.floor)}</div>`;
  }).join('');
  const actor=(x:number,y:number,kind:'player'|'goal')=>`<div class="actor ${kind}" style="left:${x/level.width*100}%;top:${y/level.height*100}%" data-cell="${x},${y}" role="img" aria-label="${kind==='player'?(language==='ja'?'旅人':'Traveler'):(language==='ja'?'出口':'Exit')} ${x+1},${y+1}">${image(kind==='player'?assets.traveler:assets.goal)}</div>`;
  return `<div class="board-frame ${level.chapter==='discovery'?'discovery-board':''}" style="--maze-ratio:${level.width/level.height}"><div id="board" class="board maze" style="--cols:${level.width};--rows:${level.height};aspect-ratio:${level.width}/${level.height}" role="group" aria-label="${title}" data-version="0.3" data-phase="${state.phase}" data-x="${state.x}" data-y="${state.y}" data-blinks="${state.blinksUsed}" data-completed="${state.completed}"><div class="floor-layer" aria-hidden="true">${floors}</div><div class="wall-layer">${walls(level).map(edge=>renderWall(edge,level,state,language)).join('')}</div><div class="actor-layer">${actor(level.goal[0],level.goal[1],'goal')}${actor(state.x,state.y,'player')}</div></div></div>`;
}
