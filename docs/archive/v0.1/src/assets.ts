const base = import.meta.env.BASE_URL;
export const assets = {
  hero: `${base}assets/art/cover.webp`,
  wall: `${base}assets/art/wall.png`, floor: `${base}assets/art/floor.png`,
  traveler: `${base}assets/art/traveler.png`, goal: `${base}assets/art/goal.png`,
  blueOpen: `${base}assets/art/blue-open.png`, blueClosed: `${base}assets/art/blue-closed.png`,
  amberOpen: `${base}assets/art/amber-open.png`, amberClosed: `${base}assets/art/amber-closed.png`,
};
export function icon(name: string): string { return `<img class="icon" src="${base}assets/icons/${name}.svg" alt="" aria-hidden="true">`; }
