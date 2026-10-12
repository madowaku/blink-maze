import { levels } from './data';
export type Language = 'ja' | 'en';
export interface Progress { version:'0.2'; current:number; cleared:string[]; language:Language }
export const STORAGE_KEY = 'blink-maze.progress.v2';
export const LEGACY_KEY = 'blink-maze.progress.v1';
// Additive chapters keep the v2 schema and the original five clear records.
const levelIds = levels.map(level => level.id);
export function loadProgress(storage?:Pick<Storage,'getItem'>,defaultLanguage:Language='ja'):Progress {
  const fallback:Progress={version:'0.2',current:0,cleared:[],language:defaultLanguage};
  try {
    const value=JSON.parse(storage?.getItem(STORAGE_KEY)??'null');
    if(!value||value.version!=='0.2') {
      const legacy=JSON.parse(storage?.getItem(LEGACY_KEY)??'null');
      return {...fallback,language:legacy?.language==='en'?'en':legacy?.language==='ja'?'ja':defaultLanguage};
    }
    return {
      version:'0.2',current:Number.isInteger(value.current)&&value.current>=0&&value.current<levelIds.length?value.current:0,
      cleared:Array.isArray(value.cleared)?[...new Set<string>(value.cleared.filter((id:unknown)=>typeof id==='string'&&levelIds.includes(id)))]:[],
      language:value.language==='en'?'en':'ja',
    };
  } catch {return fallback;}
}
export function saveProgress(progress:Progress,storage?:Pick<Storage,'setItem'>):boolean {
  try {if(!storage)return false;storage.setItem(STORAGE_KEY,JSON.stringify(progress));return true;}catch{return false;}
}

