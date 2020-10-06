import { HeroObj } from "./interfaces";
import { Directions } from "../utils/interfaces";

import moveEnemies from "./moveEnemies";
import makeTopScore from "./makeTopScore";

export default function moveHero(
  direction: Directions,
  setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
  setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  setEnemiesKilled: React.Dispatch<React.SetStateAction<number>>,
  currentTurn: number,
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>,
  hero: HeroObj,
  enemies: number[],
  adjacentTilesRelativePositions: number[],
  boardSize: number,
  setLastEnemiesKilled: React.Dispatch<React.SetStateAction<number | null>>,
  topScore: string | React.Dispatch<React.SetStateAction<string>>,
  setTopScore: string | React.Dispatch<React.SetStateAction<string>>,
  enemiesDirections: number[],
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>,
  playAudio: (audioVar: HTMLAudioElement, isAudioOn: boolean) => void,
  isAudioOn: boolean,
  topScore_mp3: HTMLAudioElement,
  medal_mp3: HTMLAudioElement,

) {
  if (!hero.alive) {
    return;
  }

  // reseting different look of sword if enemy was just killed
  setLastEnemiesKilled(null);

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

    // to change???
    let swordPositionToAdd: number = 0;

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

  // no moving to corners
  const corners = [0, 8, 72, 80];

  if (corners.indexOf(heroIndexToMove) > -1) {
    return;
  }

  //return if here would move out of the board (hero or sword) up or down
  if (
    heroIndexToMove < 0 ||
    swordIndexToMove < 0 ||
    heroIndexToMove > boardSize * boardSize - 1 ||
    swordIndexToMove > boardSize * boardSize - 1
  ) {
    return;
  }

  //return if here would move out of the board (hero or sword) left or right
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
    console.log("OUT");
    return;
  }

  //return if here would move out of the board (sword only when rotating) left or right
  if (
    (((relativePosition === -9 && hero.swordPosition % boardSize === 0) ||
      (relativePosition === 9 && (hero.swordPosition + 1) % boardSize === 0)) &&
      direction === 45) ||
    (((relativePosition === -9 && (hero.swordPosition + 1) % boardSize === 0) ||
      (relativePosition === 9 && hero.swordPosition % boardSize === 0)) &&
      direction === -45)
  ) {
    console.log("OUT");
    return;
  }

  let aliveBoolean = true;

  if (enemies.indexOf(heroIndexToMove) > -1) {
    aliveBoolean = false;
    setHero({
      ...hero,
      swordPosition: swordIndexToMove,
      heroPosition: heroIndexToMove,
      alive: aliveBoolean,
    });

    setCurrentTurn((n) => n + 1);
    makeTopScore(currentTurn, topScore, setTopScore, setTextOnDisplay, playAudio, isAudioOn, topScore_mp3, medal_mp3);

    return;
  }

  let newEnemies = [...enemies];
  // killing enemies
  if (enemies.indexOf(swordIndexToMove) > -1) {
    newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);
    setEnemies([...newEnemies]);
    setEnemiesKilled((n) => n + 1);
    setLastEnemiesKilled(swordIndexToMove);
  }

  setHero({
    ...hero,
    swordPosition: swordIndexToMove,
    heroPosition: heroIndexToMove,
    alive: aliveBoolean,
  });

  moveEnemies(
    newEnemies,
    boardSize,
    adjacentTilesRelativePositions,
    // hero.swordPosition,
    swordIndexToMove,
    heroIndexToMove,
    hero,
    setHero,
    setEnemies,
    currentTurn,
    setCurrentTurn,
    topScore,
    setTopScore,
    enemiesDirections,
    setEnemiesDirections,
    setTextOnDisplay,
    playAudio,
    isAudioOn,
    topScore_mp3,
    medal_mp3
  );
}

// function makeTopScore() {
//   if (currentTurn > parseInt(topScore)) {
//     setTopScore(currentTurn.toString());
//     localStorage.setItem("record", currentTurn.toString());
//   }
// }
