import data from './levels.json';
import { validateLevel, type Level } from './core';
export const levels = data.levels as unknown as Level[];
levels.forEach(validateLevel);

