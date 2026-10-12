export type Language = 'ja' | 'en';
export interface Progress { current: number; cleared: string[]; language: Language }
export const STORAGE_KEY = 'blink-maze.progress.v1';
export function loadProgress(storage?: Pick<Storage, 'getItem'>): Progress {
  const fallback: Progress = { current: 0, cleared: [], language: 'ja' };
  try {
    const value = JSON.parse(storage?.getItem(STORAGE_KEY) ?? 'null');
    if (!value || typeof value !== 'object') return fallback;
    return {
      current: Number.isInteger(value.current) && value.current >= 0 && value.current < 8 ? value.current : 0,
      cleared: Array.isArray(value.cleared) ? [...new Set<string>(value.cleared.filter((id: unknown) => typeof id === 'string' && /^00[1-8]$/.test(id)))] : [],
      language: value.language === 'en' ? 'en' : 'ja',
    };
  } catch { return fallback; }
}
export function saveProgress(progress: Progress, storage?: Pick<Storage, 'setItem'>): boolean {
  try { if (!storage) return false; storage.setItem(STORAGE_KEY, JSON.stringify(progress)); return true; } catch { return false; }
}
