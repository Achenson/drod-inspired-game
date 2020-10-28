
import makeRandomNumber from "./makeRandomNumber";

export default function enemiesDirections2ndTurn(
  // enemies: number[],
  // from moveEnemies: positions of enemies after 1 turn
  nextEnemiesPositions: number[],
  boardSize: number,
  adjacentTilesRelativePositions: number[],
  setEnemiesDirections: React.Dispatch<React.SetStateAction<number[]>>,
  savedEnemiesDirections: [boolean, number[]],
  setSavedEnemiesDirections: React.Dispatch<
    React.SetStateAction<[boolean, number[]]>
  >
) {
  // if the directions were already saved by going one turn back
  if (savedEnemiesDirections[0]) {
    setSavedEnemiesDirections([false, [...savedEnemiesDirections[1]]]);
    setEnemiesDirections([...savedEnemiesDirections[1]]);
    return;
  }

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
  }

  // enemy kills if hero is adjacent
  // !!!! nextEnemiesPostions & heroIndexToMove belong to the same(2nd) turn

  setEnemiesDirections([...secondTurnEnemiesDirections]);
  setSavedEnemiesDirections([false, [...secondTurnEnemiesDirections]]);
}
