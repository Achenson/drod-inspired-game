import { HeroObj } from "./interfaces";
import createEnemy from "./createEnemy";
import makeTopScore from "./makeTopScore";
import makeRandomNumber from "./makeRandomNumber";
import enemiesDirections2ndTurn from "./enemiesDirections2ndTurn";

export default function moveEnemies(
  enemies: number[],
  boardSize: number,
  adjacentTilesRelativePositions: number[],
  // heroPosition: number,
  nextSwordPosition: number,
  heroIndexToMove: number,
  hero: HeroObj,
  setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
  setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  currentTurn: number,
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>,
  topScore: string | string | React.Dispatch<React.SetStateAction<string>>,
  setTopScore: string | React.Dispatch<React.SetStateAction<string>>,
  enemiesDirections: number[],
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>,
  playAudio: (audioVar: HTMLAudioElement, isAudioOn: boolean, shouldPreviousAudioStop?: boolean) => void,
  isAudioOn: boolean,
  topScore_mp3: HTMLAudioElement,
  medal_mp3: HTMLAudioElement,
  death_mp3: HTMLAudioElement,
) {
  let nextEnemiesPositions: number[] = [];

  // enemy === enemy's position on board
  for (let enemy of enemies) {
    let possiblePositions: number[] = [];

    for (let el of adjacentTilesRelativePositions) {
      const nextIndexCalculated = enemy - el;

      let nIC = nextIndexCalculated;

      // order is important! this must be before the next, otherwise enemy will stumble upon
      // the sword if chasing hero

      // no moving out of the board up or down
      if (nIC < 0 || nIC > boardSize * boardSize - 1) {
        continue;
      }

      // no moving out of the board left or right

      // starts with sword NW of hero
      // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

      if (
        (enemy % boardSize === 0 &&
          // nw                     w            sw
          (el === 10 || el === 1 || el === -8)) ||
        // (enemy % (boardSize - 1) === 0 &&
        ((enemy + 1) % boardSize === 0 &&
          // ne                     e            se
          (el === 8 || el === -1 || el === -10))
      ) {
        continue;
      }

      // enemy won't kill itself on purpose
      if (nIC === nextSwordPosition) {
        continue;
      }

      // if it is possible to kill hero(or chase him), this will be only possible option to move
      if (nIC === heroIndexToMove) {
        possiblePositions.splice(0, possiblePositions.length, heroIndexToMove);
        break;
      }

      // enemy won't collide with each other (with the enemy that is already next to it)
      if (enemies.indexOf(nIC) > -1) {
        continue;
      }

      // if(possiblePositions.indexOf(nIC) > -1) {
      //   possiblePositions.push(enemy)
      // }

      possiblePositions.push(nIC);
    }

    // enemies won't enter the same location
    let newPossiblePositions = [];

    for (let el of possiblePositions) {
      if (nextEnemiesPositions.indexOf(el) === -1) {
        // possiblePositions.splice(possiblePositions.indexOf(el), 1)
        newPossiblePositions.push(el);
      }
    }

    // won't move
    if (newPossiblePositions.length === 0) {
      nextEnemiesPositions.push(enemy);
    }

    // only 1 possible move
    // if (possiblePositions.length === 1) {

    //   initialNextEnemiesPositions.push(possiblePositions[0]);
    // }

    if (newPossiblePositions.length >= 1) {
      let directionToMove = enemiesDirections[enemies.indexOf(enemy)];

      let indexToMove = enemy - directionToMove;

      if (newPossiblePositions.indexOf(indexToMove) > -1) {
        nextEnemiesPositions.push(indexToMove);
      } else {
        let randomNumber = makeRandomNumber(1, newPossiblePositions.length);

        let randomNextPosition = newPossiblePositions[randomNumber - 1];

        // if this nextPosition will be already taken by another enemy - don't move

        if (nextEnemiesPositions.indexOf(randomNextPosition) > -1) {
          nextEnemiesPositions.push(enemy);
        } else {
          nextEnemiesPositions.push(randomNextPosition);
        }
      }
    }
  }

  // console.log("nextEnemiesPositions");
  // console.log(nextEnemiesPositions);

  // enemy kills if hero is adjacent
  // !!!! nextEnemiesPostions & heroIndexToMove belong to the same turn
  if (nextEnemiesPositions.indexOf(heroIndexToMove) > -1) {
    setHero({ ...hero, heroPosition: heroIndexToMove, alive: false });

    // setCurrentTurn((n) => n + 1);

    makeTopScore(currentTurn, topScore, setTopScore, setTextOnDisplay, playAudio, isAudioOn, topScore_mp3, medal_mp3, death_mp3);
  }
  // else {

  //   // console.log(currentTurn);
  // }

  setCurrentTurn((n) => n + 1);

  if (currentTurn % 2 !== 0 && currentTurn !== 0) {
    nextEnemiesPositions = [
      ...nextEnemiesPositions,
      createEnemy(
        nextEnemiesPositions,
        heroIndexToMove,
        nextSwordPosition,
        boardSize
      ),
    ];
  }

  setEnemies([...nextEnemiesPositions]);

  enemiesDirections2ndTurn(
    nextEnemiesPositions,
    boardSize,
    adjacentTilesRelativePositions,
    setEnemiesDirections
  );

  // return nextEnemiesPositions;
}
