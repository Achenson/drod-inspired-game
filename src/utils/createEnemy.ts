import makeRandomNumber from "./makeRandomNumber";

export default function createEnemy(
  nextEnemiesPositions: number[],
  heroIndexToMove: number,
  nextSwordPosition: number,
  boardSize: number,
  randomNewEnemyPosition: [boolean, number],
  setRandomNewEnemyPosition: React.Dispatch<
    React.SetStateAction<[boolean, number]>
  >
): number {
  if (
    randomNewEnemyPosition[0] &&
    randomNewEnemyPosition[1] !== heroIndexToMove &&
    randomNewEnemyPosition[1] !== nextSwordPosition
  ) {
    setRandomNewEnemyPosition([false, randomNewEnemyPosition[1]]);
    return randomNewEnemyPosition[1];
  }

  let possiblePositions = [];

  let takenPositions = [
    ...nextEnemiesPositions,
    heroIndexToMove,
    nextSwordPosition,
  ];

  // enemies will arive firsty at the border, than -> at random
  let firstArrivingPositions = [];

  for (let i = 0; i < boardSize * boardSize - 1; i++) {
    if (i < 9 || i > 71 || i % boardSize === 0 || (i + 1) % boardSize === 0) {
      firstArrivingPositions.push(i);
    }
  }

  for (let el of firstArrivingPositions) {
    if (takenPositions.indexOf(el) === -1) {
      possiblePositions.push(el);
    }
  }

  // if all positions from firstArrivingPositions are taken by enemies
  if (possiblePositions.length === 0) {
    for (let i = 0; i < boardSize * boardSize - 1; i++) {
      if (
        takenPositions.indexOf(i) === -1 &&
        firstArrivingPositions.indexOf(i) === -1
      ) {
        possiblePositions.push(i);
      }
    }
  }

  let randomIndex = makeRandomNumber(1, possiblePositions.length);

  let newEnemyPosition = possiblePositions[randomIndex - 1];

  // console.log("newEnemyPosition");
  // console.log(newEnemyPosition);
  setRandomNewEnemyPosition([false, newEnemyPosition]);
  return newEnemyPosition;
}
