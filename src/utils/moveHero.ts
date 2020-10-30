import { HeroObj } from "./interfaces";
import { Directions } from "../utils/interfaces";
import { MoveHero } from "../utils/interfaces";

import {
  enemyKilled_mp3,
  forbiddenMove_mp3,
  movement_mp3,
  swing_mp3,
  waiting_mp3,
} from "./audio";

import playAudio from "./playAudio";

export default function moveHero(
  direction: Directions,
  setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
  setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  currentTurn: number,
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>,
  hero: HeroObj,
  enemies: number[],
  adjacentTilesRelativePositions: number[],
  boardSize: number,
  lastEnemyKilled: number | null,
  setLastEnemyKilled: React.Dispatch<React.SetStateAction<number | null>>,
  enemiesDirections: number[],
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>,
  setOneTurnBack: React.Dispatch<
    React.SetStateAction<{
      currentTurn: number;
      enemies: number[];
      enemiesDirections: number[];
      lastEnemyKilled: number | null;
      heroPosition: number;
      alive: boolean;
      swordPosition: number;
    }>
  >
): MoveHero {
  // reseting different look of sword if enemy was just killed
  setLastEnemyKilled(null);

  let relativePosition = hero.heroPosition - hero.swordPosition;
  let indexOfRelativePosition = adjacentTilesRelativePositions.indexOf(
    relativePosition
  );
  let heroIndexToMove: number;
  let swordIndexToMove: number;

  // if waiting
  // direction === 0 in case of "wait" btn
  if (direction === 0) {
    heroIndexToMove = hero.heroPosition;
    swordIndexToMove = hero.swordPosition;
  } else if (
    // if moving
    direction !== 45 &&
    direction !== -45
  ) {
    heroIndexToMove = hero.heroPosition + direction;
    swordIndexToMove = hero.swordPosition + direction;
    // if rotating
  } else {
    heroIndexToMove = hero.heroPosition;

    let swordPositionToAdd: number = 0;

    // rotation
    if (direction === 45) {
      if (
        indexOfRelativePosition ===
        adjacentTilesRelativePositions.length - 1
      ) {
        swordPositionToAdd = adjacentTilesRelativePositions[0];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativePositions[indexOfRelativePosition + 1];
      }
    }

    if (direction === -45) {
      if (indexOfRelativePosition === 0) {
        swordPositionToAdd =
          adjacentTilesRelativePositions[
            adjacentTilesRelativePositions.length - 1
          ];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativePositions[indexOfRelativePosition - 1];
      }
    }

    swordIndexToMove = hero.heroPosition - swordPositionToAdd;
  }

  // no moving into corners
  const corners = [0, 8, 72, 80];

  if (corners.indexOf(heroIndexToMove) > -1) {
    playAudio(forbiddenMove_mp3, isAudioOn);
    return {
      wasMovementLegal: false,
      isHeroAlive: true,
      heroIndexToMove: heroIndexToMove,
      swordIndexToMove: swordIndexToMove,
      newEnemies: enemies,
    };
  }

  //return if hero would move out of the board (hero or sword) up or down
  if (
    heroIndexToMove < 0 ||
    swordIndexToMove < 0 ||
    heroIndexToMove > boardSize * boardSize - 1 ||
    swordIndexToMove > boardSize * boardSize - 1
  ) {
    playAudio(forbiddenMove_mp3, isAudioOn);
    return {
      wasMovementLegal: false,
      isHeroAlive: true,
      heroIndexToMove: heroIndexToMove,
      swordIndexToMove: swordIndexToMove,
      newEnemies: enemies,
    };
  }

  //return if hero would move out of the board (hero or sword) left or right
  if (
    ((hero.heroPosition % boardSize === 0 ||
      hero.swordPosition % boardSize === 0) &&
      // nw                     w            sw
      (direction === 8 || direction === -1 || direction === -10)) ||
    (((hero.heroPosition + 1) % boardSize === 0 ||
      (hero.swordPosition + 1) % boardSize === 0) &&
      // ne                     e            se
      (direction === 10 || direction === 1 || direction === -8))
  ) {
    playAudio(forbiddenMove_mp3, isAudioOn);
    return {
      wasMovementLegal: false,
      isHeroAlive: true,
      heroIndexToMove: heroIndexToMove,
      swordIndexToMove: swordIndexToMove,
      newEnemies: enemies,
    };
  }
  //return if hero would move out of the board (sword only when rotating) left or right
  if (
    (((relativePosition === -9 && hero.swordPosition % boardSize === 0) ||
      (relativePosition === 9 && (hero.swordPosition + 1) % boardSize === 0)) &&
      direction === 45) ||
    (((relativePosition === -9 && (hero.swordPosition + 1) % boardSize === 0) ||
      (relativePosition === 9 && hero.swordPosition % boardSize === 0)) &&
      direction === -45)
  ) {
    playAudio(forbiddenMove_mp3, isAudioOn);
    return {
      wasMovementLegal: false,
      isHeroAlive: true,
      heroIndexToMove: heroIndexToMove,
      swordIndexToMove: swordIndexToMove,
      newEnemies: enemies,
    };
  }

  if (currentTurn !== 0) {
    setOneTurnBack({
      currentTurn: currentTurn,
      enemies: [...enemies],
      enemiesDirections: [...enemiesDirections],
      lastEnemyKilled: lastEnemyKilled,
      heroPosition: hero.heroPosition,
      alive: hero.alive,
      swordPosition: hero.swordPosition,
    });
  }

  // play audio if rotating in not forbidden
  if (direction === 45 || direction === -45) {
    playAudio(swing_mp3, isAudioOn);
  } else if (direction === 0) {
    playAudio(waiting_mp3, isAudioOn);
  } else {
    playAudio(movement_mp3, isAudioOn);
  }

  let aliveBoolean = true;

  // hero dies - steps on enemy on purpose
  if (enemies.indexOf(heroIndexToMove) > -1) {
    aliveBoolean = false;
    setHero({
      ...hero,
      swordPosition: swordIndexToMove,
      heroPosition: heroIndexToMove,
      alive: aliveBoolean,
    });

    setCurrentTurn((n) => n + 1);

    return {
      wasMovementLegal: true,
      isHeroAlive: false,
      heroIndexToMove: heroIndexToMove,
      swordIndexToMove: swordIndexToMove,
      newEnemies: enemies,
    };
  }
  //if hero survived after moving
  let newEnemies = [...enemies];

  // killing enemies
  if (enemies.indexOf(swordIndexToMove) > -1) {
    playAudio(enemyKilled_mp3, isAudioOn, true);
    newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);
    setEnemies([...newEnemies]);
    // setEnemiesKilled((n) => n + 1);
    setLastEnemyKilled(swordIndexToMove);
  }

  setHero({
    ...hero,
    swordPosition: swordIndexToMove,
    heroPosition: heroIndexToMove,
    alive: aliveBoolean,
  });

  return {
    wasMovementLegal: true,
    isHeroAlive: true,
    heroIndexToMove: heroIndexToMove,
    swordIndexToMove: swordIndexToMove,
    newEnemies: [...newEnemies],
  };
}
