import {HeroObj} from "./interfaces"
import { Directions } from "../utils/interfaces";

import moveEnemies from "./moveEnemies"

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
    board: number[][],
    boardSize: number
  ) {
    // direction === 0 in case of "wait" btn
    if (direction === 0) {
      moveEnemies(
        enemies,
        boardSize,
        adjacentTilesRelativePositions,
        hero.heroPosition,
        hero.swordPosition,
        // next position is the same as current
        hero.heroPosition,
        hero,
        setHero,
        setEnemies,
        currentTurn,
        setCurrentTurn
      );
  
      return;
    }
  
    let heroIndexToMove = hero.heroPosition + direction;
    let swordIndexToMove = hero.swordPosition + direction;
  
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
      // board x,y cordinates go from 0 to boardSize-1
      ((board[hero.heroPosition][0] === 0 ||
        board[hero.swordPosition][0] === 0) &&
        (direction === -10 || direction === 8 || direction === -1)) ||
      ((board[hero.heroPosition][0] === boardSize - 1 ||
        board[hero.swordPosition][0] === boardSize - 1) &&
        (direction === -8 || direction === 1 || direction === 10)) ||
      ((board[hero.heroPosition][0] === boardSize - 1 ||
        board[hero.swordPosition][0] === boardSize - 1) &&
        (direction === -8 || direction === 1 || direction === 10))
    ) {
      console.log("OUT");
      return;
    }
  
    let aliveBoolean = true;
  
    // if(heroIndexToMove === enemies[enemies.indexOf(heroIndexToMove)]) {
    if (enemies.indexOf(heroIndexToMove) > -1) {
      aliveBoolean = false;
      setHero({
        ...hero,
        swordPosition: swordIndexToMove,
        heroPosition: heroIndexToMove,
        alive: aliveBoolean,
      });
      return;
    }
  
    let newEnemies = [...enemies];
    if (enemies.indexOf(swordIndexToMove) > -1) {
      // newEnemies[newEnemies.indexOf(swordIndexToMove)] = null;
  
      newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);
      setEnemies([...newEnemies]);
      setEnemiesKilled((n) => n + 1);
    }
  
    setHero({
      ...hero,
      swordPosition: swordIndexToMove,
      heroPosition: heroIndexToMove,
      alive: aliveBoolean,
    });
  
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
      hero.heroPosition,
      // hero.swordPosition,
      swordIndexToMove,
      heroIndexToMove,
      hero,
      setHero,
      setEnemies,
      currentTurn,
      setCurrentTurn
    );
  }