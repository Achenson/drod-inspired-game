import makeRandomNumber from "./makeRandomNumber";

export default function createEnemy(
    nextEnemiesPositions: number[],
    heroIndexToMOve: number,
    nextSwordPosition: number,
    boardSize: number,
  ): number {
    let possiblePositions = [];
  
    let takenPositions = [
      ...nextEnemiesPositions,
      heroIndexToMOve,
      nextSwordPosition,
    ];
  
    for (let i = 0; i < boardSize * boardSize - 1; i++) {
      if (takenPositions.indexOf(i) === -1) {
        possiblePositions.push(i);
      }
    }
  
    let randomIndex = makeRandomNumber(1, possiblePositions.length);
  
    let newEnemyPosition = possiblePositions[randomIndex - 1];
  
    console.log("newEnemyPosition");
    console.log(newEnemyPosition);
    return newEnemyPosition;
  }