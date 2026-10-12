const base = import.meta.env.BASE_URL;
export const assets = {
  hero: `${base}assets/art/v02/cover.webp`, paper: `${base}assets/art/v02/paper.webp`,
  wall: `${base}assets/art/v02/wall.png`, floor: `${base}assets/art/v02/floor.png`,
  traveler: `${base}assets/art/v02/traveler.png`, goal: `${base}assets/art/v02/goal.png`,
  blueOpen: `${base}assets/art/v02/blue-open.png`, blueClosed: `${base}assets/art/v02/blue-closed.png`,
  amberOpen: `${base}assets/art/v02/amber-open.png`, amberClosed: `${base}assets/art/v02/amber-closed.png`,
};
export function icon(name: string): string { return `<img class="icon" src="${base}assets/icons/${name}.svg" alt="" aria-hidden="true">`; }
