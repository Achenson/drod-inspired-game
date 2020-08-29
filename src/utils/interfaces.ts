export interface HeroObj {
    heroPosition: number;
    alive: boolean;
    swordPosition: number;
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
  }