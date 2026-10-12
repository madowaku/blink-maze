export type Phase = 0 | 1;
export type Action = 'U' | 'D' | 'L' | 'R' | 'T' | 'UNDO';
export type Rejection = 'wall' | 'unsafe' | 'budget' | 'finished' | 'empty';
export interface Level {
  id: string; title: string; grid: string[]; blinkLimit: number;
  initialPhase: string; verifiedSolution: string; verifiedActions: number; verifiedBlinks: number;
}
export interface Snapshot {
  x: number; y: number; phase: Phase; blinksUsed: number; moves: number; completed: boolean;
}
export interface GameState extends Snapshot { levelId: string; undoStack: Snapshot[] }
export interface Transition { state: GameState; accepted: boolean; reason?: Rejection }
const directions = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] } as const;
export function validateLevel(level: Level): void {
  const flat = level.grid.join('');
  if (!level.grid.length || !level.grid[0].length || level.grid.some(row => row.length !== level.grid[0].length)) throw new Error(`Uneven grid: ${level.id}`);
  if (!/^[#.SGAB]+$/.test(flat) || flat.split('S').length !== 2 || flat.split('G').length !== 2) throw new Error(`Invalid tiles or endpoints: ${level.id}`);
  if (!Number.isInteger(level.blinkLimit) || level.blinkLimit < 0 || level.initialPhase !== 'BLUE_OPEN') throw new Error(`Invalid initial rules: ${level.id}`);
}
export function tileAt(level: Level, x: number, y: number): string { return level.grid[y]?.[x] ?? '#'; }
export function isBlocked(tile: string, phase: Phase): boolean {
  return tile === '#' || (tile === 'A' && phase === 0) || (tile === 'B' && phase === 1);
}
export function createState(level: Level): GameState {
  validateLevel(level);
  const y = level.grid.findIndex(row => row.includes('S'));
  return { levelId: level.id, x: level.grid[y].indexOf('S'), y, phase: 0, blinksUsed: 0, moves: 0, completed: false, undoStack: [] };
}
function snapshot(state: GameState): Snapshot {
  const { x, y, phase, blinksUsed, moves, completed } = state;
  return { x, y, phase, blinksUsed, moves, completed };
}
export function blinkRejection(level: Level, state: Snapshot): Rejection | undefined {
  if (state.completed) return 'finished';
  if (isBlocked(tileAt(level, state.x, state.y), (1 - state.phase) as Phase)) return 'unsafe';
  if (state.blinksUsed >= level.blinkLimit) return 'budget';
}
export function transition(level: Level, state: GameState, action: Action): Transition {
  const reject = (reason: Rejection): Transition => ({ state, accepted: false, reason });
  // Clear screens stop gameplay. Replay creates a fresh state instead.
  if (state.completed) return reject('finished');
  if (action === 'UNDO') {
    const previous = state.undoStack.at(-1);
    if (!previous) return reject('empty');
    return { accepted: true, state: { ...state, ...previous, undoStack: state.undoStack.slice(0, -1) } };
  }
  if (action === 'T') {
    const reason = blinkRejection(level, state);
    if (reason) return reject(reason);
    return { accepted: true, state: { ...state, phase: (1 - state.phase) as Phase, blinksUsed: state.blinksUsed + 1, undoStack: [...state.undoStack, snapshot(state)] } };
  }
  const [dx, dy] = directions[action];
  const x = state.x + dx, y = state.y + dy;
  if (isBlocked(tileAt(level, x, y), state.phase)) return reject('wall');
  return { accepted: true, state: { ...state, x, y, moves: state.moves + 1, completed: tileAt(level, x, y) === 'G', undoStack: [...state.undoStack, snapshot(state)] } };
}
// Solver is used only by tests. Gameplay never reads a solution or moves the player.
export function solve(level: Level): string | null {
  const initial = createState(level);
  const queue: { state: GameState; path: string }[] = [{ state: initial, path: '' }];
  const key = (s: GameState) => `${s.x},${s.y},${s.phase},${s.blinksUsed}`;
  const seen = new Set([key(initial)]);
  for (let head = 0; head < queue.length; head++) {
    const { state, path } = queue[head];
    if (state.completed) return path;
    for (const action of ['R', 'L', 'U', 'D', 'T'] as const) {
      const result = transition(level, state, action);
      if (!result.accepted || seen.has(key(result.state))) continue;
      seen.add(key(result.state));
      queue.push({ state: { ...result.state, undoStack: [] }, path: path + action });
    }
  }
  return null;
}
