import './style.css';
import levelsData from './levels.json';
import { blinkRejection, createState, transition, type Action, type Rejection } from './core';
import { assets, icon } from './assets';
import { GameAudio } from './audio';
import { copy, hints, titles } from './text';
import { loadProgress, saveProgress, type Language } from './storage';

const app = document.querySelector<HTMLDivElement>('#app')!;
let storage: Storage | undefined;
try { storage = window.localStorage; } catch { /* Session-only play remains available. */ }
const progress = loadProgress(storage);
let language: Language = progress.language;
let current = progress.current;
let state = createState(levelsData.levels[current]);
let modal: 'help' | 'levels' | 'credits' | 'clear' | null = null;
let hintVisible = false;
let message: string = copy[language].ready;
let lockUntil = 0;
let saved = Boolean(storage);
let returnFocus = 'help';
const audio = new GameAudio();
const text = () => copy[language];
const level = () => levelsData.levels[current];
function persist(): void {
  progress.current = current; progress.language = language;
  saved = saveProgress(progress, storage);
}
function img(src: string, className = ''): string { return `<img class="${className}" src="${src}" alt="" draggable="false" aria-hidden="true">`; }
function button(command: string, label: string, inner: string, className = '', disabled = false): string {
  return `<button type="button" data-command="${command}" aria-label="${label}" class="${className}" ${disabled ? 'disabled' : ''}>${inner}</button>`;
}
function eyeSrc(family: 'A' | 'B'): string {
  return family === 'A' ? (state.phase === 0 ? assets.blueOpen : assets.blueClosed) : (state.phase === 0 ? assets.amberClosed : assets.amberOpen);
}
function navigation(): string {
  return levelsData.levels.map((l, i) => {
    const cleared = progress.cleared.includes(l.id);
    return `<button type="button" data-command="level-${i}" class="level-dot ${current === i ? 'selected' : ''} ${cleared ? 'cleared' : ''}" aria-label="${l.id} ${titles[language][i]}${cleared ? `, ${text().cleared}` : ''}" ${current === i ? 'aria-current="step"' : ''}>${String(i + 1).padStart(2, '0')}${cleared ? icon('check') : ''}</button>`;
  }).join('');
}
function board(): string {
  const rows = level().grid;
  const cols = rows[0].length;
  const tiles = rows.flatMap((row, y) => [...row].map((tile, x) => {
    const eye = tile === 'A' || tile === 'B';
    const opened = eye && ((tile === 'A') === (state.phase === 0));
    const name = tile === '#' ? (language === 'ja' ? '壁' : 'Wall') : tile === 'G' ? (language === 'ja' ? '出口' : 'Exit') : eye ? `${tile === 'A' ? (language === 'ja' ? '青' : 'Blue') : (language === 'ja' ? '琥珀' : 'Amber')} ${opened ? text().open : text().closed}` : (language === 'ja' ? '床' : 'Floor');
    return `<div class="tile ${tile === '#' ? 'wall' : 'floor'} ${eye ? `eye ${opened ? 'eye-open' : 'eye-closed'}` : ''}" role="img" aria-label="${x + 1},${y + 1}: ${name}" data-tile="${tile}">${img(tile === '#' ? assets.wall : assets.floor, 'tile-base')}${eye ? img(eyeSrc(tile), 'tile-object') : tile === 'G' ? img(assets.goal, 'tile-object door') : ''}</div>`;
  })).join('');
  return `<div class="board-frame"><div id="board" class="board" style="--cols:${cols};--rows:${rows.length}" role="group" aria-label="${titles[language][current]}" data-phase="${state.phase}" data-x="${state.x}" data-y="${state.y}" data-blinks="${state.blinksUsed}" data-completed="${state.completed}">${tiles}<div class="player-layer" aria-hidden="true"><div class="player" style="grid-column:${state.x + 1};grid-row:${state.y + 1}">${img(assets.traveler)}</div></div></div></div>`;
}
function render(): void {
  const activeCommand = (document.activeElement as HTMLElement | null)?.dataset.command;
  const t = text();
  document.documentElement.lang = language;
  const remaining = level().blinkLimit - state.blinksUsed;
  const rejection = blinkRejection(level(), state);
  app.innerHTML = `<div class="game-shell" ${modal ? 'inert' : ''}>
    <header class="masthead"><a class="wordmark" href="#" data-command="home">BLINK MAZE<span>${t.subtitle}</span></a>
      <div class="top-tools">${button('language', language === 'ja' ? 'Switch to English' : '日本語に切り替え', language === 'ja' ? 'EN' : 'JA', 'language')}${button('sound', audio.enabled ? t.soundOn : t.soundOff, icon(audio.enabled ? 'volume' : 'volume-off'), 'tool sound')}${button('help', t.help, icon('help'), 'tool')}</div>
    </header>
    <main class="main-layout"><aside class="story"><p class="eyebrow">${t.chapter}</p><h1>${t.headline.replace('\n','<br>')}</h1><p class="story-intro">${t.intro.replace('\n','<br>')}</p><img class="cover" src="${assets.hero}" alt="${language === 'ja' ? '葉に包まれた不思議な青い目と、小さな旅人' : 'A mysterious blue eye among leaves and a little traveler'}"><p class="story-footer">${t.footer}</p></aside>
    <section class="play-area" aria-label="BLINK MAZE"><div class="level-header"><div><p class="eyebrow">LEVEL ${level().id} <span class="small-progress">/ 008</span></p><h2>${titles[language][current]}</h2></div><div class="budget"><span>${t.budget}</span><strong>${remaining}<i> / ${level().blinkLimit}</i></strong></div></div>
      <div class="board-space">${board()}</div>
      <div class="legend"><span>${img(assets.blueOpen)}${t.open}</span><span>${img(assets.amberClosed)}${t.closed}</span></div>
      <p class="rule">${t.rule}</p>
      <div class="feedback-row"><p id="feedback" role="status" aria-live="polite">${message}</p>${button('hint', t.hint, `${icon('bulb')}<span>${t.hint}</span>`, 'hint-button')}</div>
      ${hintVisible ? `<p class="hint-text">${hints[language][current]}</p>` : ''}
      <div class="controls" aria-label="${t.actions}"><div class="action-group">
        <button type="button" data-command="blink" class="blink-button ${rejection ? 'unavailable' : ''}" aria-disabled="${Boolean(rejection)}" aria-describedby="blink-reason">${img(eyeSrc('A'))}<span>${t.blink}</span><kbd>Space</kbd></button>
        <div class="secondary-actions">${button('undo', t.undo, `${icon('arrow-back-up')}<span>${t.undo}</span><kbd>Z</kbd>`, 'secondary', state.undoStack.length === 0 || state.completed)}${button('restart', t.restart, `${icon('refresh')}<span>${t.restart}</span><kbd>R</kbd>`, 'secondary')}</div>
      </div><div class="dpad" aria-label="${t.move}">${button('up', t.up, icon('arrow-up'), 'up', state.completed)}${button('left', t.left, icon('arrow-left'), 'left', state.completed)}<span class="dpad-label">${t.move}</span>${button('right', t.right, icon('arrow-right'), 'right', state.completed)}${button('down', t.down, icon('arrow-down'), 'down', state.completed)}</div></div>
      <p id="blink-reason" class="blink-reason">${rejection === 'unsafe' ? t.safe : rejection === 'budget' ? t.noBudget : '&nbsp;'}</p>
      <nav class="level-nav" aria-label="${t.select}">${navigation()}</nav>
      <div class="play-footer"><span>${progress.cleared.length} / 8 ${t.progress}</span>${button('levels', t.select, `${icon('grid-dots')}<span>${t.select}</span>`, 'text-button')}</div>
    </section></main>
    <footer class="site-footer"><span>BLINK MAZE <small>v0.1</small></span>${button('credits', t.credits, t.credits, 'text-button')}</footer>
  </div>${modal ? dialogContent() : ''}`;
  const sound = app.querySelector('[data-command="sound"]');
  sound?.setAttribute('aria-pressed', String(audio.enabled));
  app.querySelector('[data-command="hint"]')?.setAttribute('aria-expanded', String(hintVisible));
  if (modal) {
    (app.querySelector('.dialog [data-command]') as HTMLElement | null)?.focus({ preventScroll: true });
  } else if (activeCommand) {
    (app.querySelector(`[data-command="${activeCommand}"]`) as HTMLElement | null)?.focus({ preventScroll: true });
  }
}
function dialogContent(): string {
  const t = text();
  let content = '';
  if (modal === 'clear') {
    const allCleared = progress.cleared.length === 8;
    content = `${img(assets.goal, 'clear-art')}<p class="eyebrow">${allCleared ? 'ALL EIGHT / COMPLETE' : `LEVEL ${level().id} / CLEAR`}</p><h2 id="dialog-title">${allCleared ? t.allClear : t.found}</h2><p>${allCleared ? t.allBody : t.clearBody}</p><div class="result-stats"><span><strong>${state.blinksUsed}</strong>${t.blinks}</span><span><strong>${state.moves}</strong>${t.steps}</span></div>${button(current < 7 ? 'next' : 'levels', current < 7 ? t.next : t.select, `${current < 7 ? t.next : t.select}${icon('chevron-right')}`, 'primary')}${button('replay', t.replay, t.replay, 'secondary')}${current < 7 ? button('levels', t.select, t.select, 'text-button') : ''}`;
  } else if (modal === 'levels') {
    content = `<p class="eyebrow">THE LITTLE JOURNEY</p><h2 id="dialog-title">${t.levels}</h2><div class="level-list">${levelsData.levels.map((l,i) => button(`level-${i}`, `${l.id} ${titles[language][i]}`, `<span class="level-num">${l.id}</span><span>${titles[language][i]}</span>${progress.cleared.includes(l.id) ? icon('check') : icon('chevron-right')}`, `level-item ${i === current ? 'selected' : ''}`)).join('')}</div><p class="save-note">${saved ? t.saveNote : t.noSave}</p>`;
  } else if (modal === 'help') {
    content = `<p class="eyebrow">SEE THINGS DIFFERENTLY</p><h2 id="dialog-title">${t.help}</h2><div class="help-eyes">${img(assets.blueOpen)}${img(assets.amberClosed)}</div><p>${t.helpRule}</p><p>${t.helpBudget}</p><p>${t.helpUndo}</p><p class="key-guide">${t.instructions}</p>`;
  } else {
    content = `<p class="eyebrow">MADE WITH A LITTLE MAGIC</p><h2 id="dialog-title">${t.credits}</h2><p>${t.artCredit}</p><p><a href="https://otologic.jp/free/bgm/short-loop01.html" target="_blank" rel="noreferrer">${t.bgmCredit}</a></p><p><a href="https://kenney.nl/assets/ui-audio" target="_blank" rel="noreferrer">${t.seCredit}</a></p><p><a href="https://tabler.io/license" target="_blank" rel="noreferrer">${t.iconCredit}</a></p><p class="save-note">${saved ? t.saveNote : t.noSave}</p>`;
  }
  return `<div class="modal-backdrop"><section class="dialog ${modal === 'clear' ? 'clear-dialog' : ''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title">${modal !== 'clear' ? button('close', t.close, icon('x'), 'dialog-close tool') : ''}${content}</section></div>`;
}
function openModal(kind: Exclude<typeof modal, null>): void {
  returnFocus = (document.activeElement as HTMLElement)?.dataset.command ?? 'help';
  modal = kind; render();
}
function closeModal(): void {
  modal = null; render();
  (app.querySelector(`[data-command="${returnFocus}"]`) as HTMLElement | null)?.focus({ preventScroll: true });
}
function startLevel(index: number): void {
  if (index < 0 || index >= levelsData.levels.length) return;
  current = index; state = createState(level()); modal = null; hintVisible = false; lockUntil = 0;
  message = text().ready; persist(); render();
}
function perform(action: Action): void {
  if (modal || performance.now() < lockUntil) return;
  const result = transition(level(), state, action);
  if (!result.accepted) {
    const reasons: Partial<Record<Rejection, string>> = { wall: text().wall, unsafe: text().unsafe, budget: text().noBudget, empty: text().empty };
    message = reasons[result.reason!] ?? text().ready;
    const feedback = document.querySelector('#feedback');
    if (feedback) feedback.textContent = message;
    audio.play('blocked');
    return;
  }
  state = result.state;
  message = action === 'T' ? text().flipped : action === 'UNDO' ? text().undone : text().ready;
  if (state.completed) {
    if (!progress.cleared.includes(level().id)) progress.cleared.push(level().id);
    persist(); modal = 'clear'; audio.play('clear');
  } else { audio.play(action === 'T' ? 'blink' : action === 'UNDO' ? 'undo' : 'move'); }
  render();
  if (action === 'T') {
    lockUntil = performance.now() + 150;
    app.querySelector('#board')?.classList.add('blinking');
  }
}
async function command(commandName: string): Promise<void> {
  const mapping: Record<string, Action> = { up:'U', down:'D', left:'L', right:'R', blink:'T', undo:'UNDO' };
  if (mapping[commandName]) { perform(mapping[commandName]); return; }
  if (commandName.startsWith('level-')) { startLevel(Number(commandName.slice(6))); return; }
  switch (commandName) {
    case 'home': startLevel(0); break;
    case 'restart': if (!modal && performance.now() >= lockUntil) { startLevel(current); message = text().restarted; render(); } break;
    case 'replay': startLevel(current); break;
    case 'next': startLevel(current + 1); break;
    case 'language': language = language === 'ja' ? 'en' : 'ja'; message = copy[language].ready; persist(); render(); break;
    case 'sound': await audio.toggle(); render(); break;
    case 'hint': hintVisible = !hintVisible; render(); break;
    case 'help': case 'credits': case 'levels': openModal(commandName); break;
    case 'close': closeModal(); break;
  }
}
app.addEventListener('click', event => {
  const element = (event.target as Element).closest<HTMLElement>('[data-command]');
  if (element) { event.preventDefault(); void command(element.dataset.command!); }
  else if ((event.target as HTMLElement).classList.contains('modal-backdrop') && modal !== 'clear') closeModal();
});
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
  if (modal) {
    if (event.key === 'Escape' && modal !== 'clear') { event.preventDefault(); closeModal(); }
    if (event.key === 'Tab') {
      const nodes = [...app.querySelectorAll<HTMLElement>('.dialog button:not(:disabled), .dialog a[href]')];
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    // Space/Enter activate focused dialog controls normally.
    if (!['Tab','Enter',' ','Escape'].includes(event.key)) event.preventDefault();
    return;
  }
  const map: Record<string, string> = { arrowup:'up', w:'up', arrowdown:'down', s:'down', arrowleft:'left', a:'left', arrowright:'right', d:'right', ' ':'blink', z:'undo', r:'restart' };
  const name = map[event.key.toLowerCase()];
  if (name) { event.preventDefault(); if (!event.repeat) void command(name); }
  else if (event.key === '?') { event.preventDefault(); openModal('help'); }
});
render();
