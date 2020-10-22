// import { HeroObj } from "./interfaces";
// import createEnemy from "./createEnemy";
// import makeRecordScore from "./makeRecordScore";
import makeRandomNumber from "./makeRandomNumber";



export default function enemiesDirections2ndTurn(
  // enemies: number[],
  // from moveEnemies: positions of enemies after 1 turn
  nextEnemiesPositions: number[],
  boardSize: number,
  adjacentTilesRelativePositions: number[],
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,

  // heroPosition: number,


  // not needed -> belong to 1st turn, enemiesOrientation is their tendency to move in 2nd turn
  // nextSwordPosition: number,
  // heroIndexToMove: number,


  // hero: HeroObj,
  // setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
  // setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  // currentTurn: number,
  // setCurrentTurn: React.Dispatch<React.SetStateAction<number>>,
  // recordScore: string,
  // setRecordScore: React.Dispatch<React.SetStateAction<string>>
) {
  let secondTurnEnemiesDirections: number[] = [];

  // enemy === enemy's position on board
  for (let enemy of nextEnemiesPositions) {
    
    let possibleDirections: number[] = [];

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
      // if (nIC === nextSwordPosition) {
      //   continue;
      // }

      // if it is possible to kill hero(or chase him), this will be only possible option to move
      // if (nIC === heroIndexToMove) {
      //   possiblePositions.splice(0, possiblePositions.length, heroIndexToMove);
      //   break;
      // }

      // enemy won't collide with each other

      //  !! enemies can point to the same tile, one of them won't move
      // if (nextEnemiesPositions.indexOf(nextIndexCalculated) > -1) {
      //   continue;
      // }


      // el from adjacentTilesRelativePositions is being pushed here

      possibleDirections.push(el);
    }

  

    // there will always be a possible DIRECTION
    // if (possibleDirections.length === 0) {
    //   secondTurnEnemiesDirections.push(enemy);
    // }


      let randomNumber = makeRandomNumber(1, possibleDirections.length);

      let randomNextDirection = possibleDirections[randomNumber - 1];

      
      secondTurnEnemiesDirections.push(randomNextDirection);
      


      // if this nextPosition will be already taken by another enemy - don't move
      // if (nextEnemiesPositions.indexOf(randomNextPosition) > -1) {
      //   nextEnemiesPositions.push(enemy);
      // } else {
      //   nextEnemiesPositions.push(randomNextPosition);
      // }


    
  }


  // enemy kills if hero is adjacent
  // !!!! nextEnemiesPostions & heroIndexToMove belong to the same(2nd) turn

  // if (nextEnemiesPositions.indexOf(heroIndexToMove) > -1) {
  //   setHero({ ...hero, heroPosition: heroIndexToMove, alive: false });
  //   setCurrentTurn((n) => n + 1);
  //   makeRecordScore(currentTurn, recordScore, setRecordScore);
  // } else {
  //   setCurrentTurn((n) => n + 1);
  //   console.log(currentTurn);
  // }

  // if (currentTurn % 2 !== 0 && currentTurn !== 0) {
  //   nextEnemiesPositions = [
  //     ...nextEnemiesPositions,
  //     createEnemy(
  //       nextEnemiesPositions,
  //       heroIndexToMove,
  //       nextSwordPosition,
  //       boardSize
  //     ),
  //   ];
  // }
  // setEnemies([...nextEnemiesPositions]);

  // return nextEnemiesPositions;


  setEnemiesDirections([...secondTurnEnemiesDirections]);
}
