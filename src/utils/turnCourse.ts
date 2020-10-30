import { Directions } from "./interfaces";
import { HeroObj } from "./interfaces";

import moveHero from "./moveHero";
import moveEnemies from "./moveEnemies";
import createEnemy from "./createEnemy";
import enemiesDirections2ndTurn from "./enemiesDirections2ndTurn";
import makeTopScore from "./makeTopScore";

export default function turnCourse(
  directionToMove: Directions,
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
  >,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>,
  topScore: number | React.Dispatch<React.SetStateAction<number>>,
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>,
  randomNewEnemyPosition: [boolean, number],
  setRandomNewEnemyPosition: React.Dispatch<
    React.SetStateAction<[boolean, number]>
  >,
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,
  savedEnemiesDirections: [boolean, number[]],
  setSavedEnemiesDirections: React.Dispatch<
    React.SetStateAction<[boolean, number[]]>
  >
) {
  if (!hero.alive) {
    return;
  }

  setTextOnDisplay("");

  let {
    wasMovementLegal,
    isHeroAlive,
    heroIndexToMove,
    swordIndexToMove,
    newEnemies,
  } = moveHero(
    directionToMove,
    setHero,
    setEnemies,
    currentTurn,
    setCurrentTurn,
    hero,
    enemies,
    adjacentTilesRelativePositions,
    boardSize,
    lastEnemyKilled,
    setLastEnemyKilled,
    enemiesDirections,
    isAudioOn,
    setOneTurnBack
  );

  if (!wasMovementLegal) {
    return;
  }

  if (!isHeroAlive) {
    makeTopScore(
      currentTurn,
      topScore,
      setTopScore,
      setTextOnDisplay,
      isAudioOn,
      "death"
    );
    return;
  }

  let nextEnemiesPositions = moveEnemies(
    newEnemies,
    boardSize,
    adjacentTilesRelativePositions,
    swordIndexToMove,
    heroIndexToMove,
    enemiesDirections
  );

  // enemy kills if hero is adjacent
  // !!!! nextEnemiesPostions & heroIndexToMove belong to the same turn
  if (nextEnemiesPositions.indexOf(heroIndexToMove) > -1) {
    setHero({ ...hero, heroPosition: heroIndexToMove, alive: false });

    makeTopScore(
      currentTurn,
      topScore,
      setTopScore,
      setTextOnDisplay,
      isAudioOn,
      "death"
    );
  }

  setCurrentTurn((n) => n + 1);

  if (currentTurn % 2 !== 0 && currentTurn !== 0) {
    nextEnemiesPositions = [
      ...nextEnemiesPositions,
      createEnemy(
        nextEnemiesPositions,
        heroIndexToMove,
        swordIndexToMove,
        boardSize,
        randomNewEnemyPosition,
        setRandomNewEnemyPosition
      ),
    ];
  }

  setEnemies([...nextEnemiesPositions]);

  enemiesDirections2ndTurn(
    nextEnemiesPositions,
    boardSize,
    adjacentTilesRelativePositions,
    setEnemiesDirections,
    savedEnemiesDirections,
    setSavedEnemiesDirections
  );
}
