import {HeroObj} from "./interfaces"

import moveEnemies from "./moveEnemies"

export default function rotateHero(
    direction: "clockwise" | "anticlockwise",
    hero: HeroObj,
    enemies: number[],
    adjacentTilesRelativePositions: number[],
    board: number[][],
    boardSize: number,
    setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
    setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
    setEnemiesKilled: React.Dispatch<React.SetStateAction<number>>,
    currentTurn: number,
    setCurrentTurn: React.Dispatch<React.SetStateAction<number>>
  ) {
    let relativePosition = hero.heroPosition - hero.swordPosition;
  
    // indexOfRelativePosition taken from the array of all possible relative positions
    // "clockwise" circle between indexes to the right, "anticlockwise" the other way around
    let indexOfRelativePosition = adjacentTilesRelativePositions.indexOf(
      relativePosition
    );
  
    // to change???
    let swordPositionToAdd: number = 0;
  
    if (direction === "clockwise") {
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
  
    if (direction === "anticlockwise") {
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
  
    let swordIndexToMove = hero.heroPosition - swordPositionToAdd;
  
    //return if here would move sword out of the board up or down
    if (swordIndexToMove < 0 || swordIndexToMove > boardSize * boardSize - 1) {
      return;
    }
  
    //                                      nw  n ne   e   se   s  sw  w
    // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];
  
    //return if here would move sword out of the board  left or right
    if (
      // board x,y cordinates go from 0 to boardSize-1
      (((relativePosition === -9 && board[hero.swordPosition][0] === 0) ||
        (relativePosition === 9 &&
          board[hero.swordPosition][0] === boardSize - 1)) &&
        direction === "clockwise") ||
      (((relativePosition === -9 &&
        board[hero.swordPosition][0] === boardSize - 1) ||
        (relativePosition === 9 && board[hero.swordPosition][0] === 0)) &&
        direction === "anticlockwise")
    ) {
      console.log("OUT");
      return;
    }
  
    console.log(board[swordIndexToMove][0]);
    console.log(board[swordIndexToMove][1]);
  
    let newEnemies = [...enemies];
  
    if (enemies.indexOf(swordIndexToMove) > -1) {
      // newEnemies[newEnemies.indexOf(swordIndexToMove)] = null;
  
      newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);
  
      setEnemies([...newEnemies]);
      setEnemiesKilled((n) => n + 1);
    }
  
    setHero({ ...hero, swordPosition: swordIndexToMove });
  
    // setEnemies([
    //   ...moveEnemies(
    //     newEnemies,
    //     boardSize,
    //     adjacentTilesRelativePositions,
    //     hero.heroPosition,
    //     hero.swordPosition
    //   ),
    // ]);
  
    moveEnemies(
      newEnemies,
      boardSize,
      adjacentTilesRelativePositions,
      swordIndexToMove,
      // next position is the same as current
      hero.heroPosition,
      hero,
      setHero,
      setEnemies,
      currentTurn,
      setCurrentTurn
    );
  }