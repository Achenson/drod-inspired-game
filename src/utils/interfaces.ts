export interface HeroObj {
  heroPosition: number;
  alive: boolean;
  swordPosition: number;
}

export interface BoardObj {
  [key: string]: string;
}

export interface MoveHero {
  wasMovementLegal: boolean;
  isHeroAlive: boolean;
  heroIndexToMove: number;
  swordIndexToMove: number;
  newEnemies: number[];
}

export enum Directions {
  nw = -10,
  n = -9,
  ne = -8,
  e = 1,
  se = 10,
  s = 9,
  sw = 8,
  w = -1,
  wait = 0,
  // rotating 45deg / -45deg
  clockwise = 45,
  anticlockwise = -45,
}
