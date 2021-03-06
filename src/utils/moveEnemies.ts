export default function moveEnemies(
  enemies: number[],
  boardSize: number,
  adjacentTilesRelativePositions: number[],
  nextSwordPosition: number,
  heroIndexToMove: number,
  enemiesDirections: number[]
) {
  let nextEnemiesPositions: number[] = [];

  // enemy === enemy's position on board
  for (let enemy of enemies as number[]) {
    // positions for single enemy
    let possiblePositions: number[] = [];

    for (let el of adjacentTilesRelativePositions) {
      const nextIndexCalculated = enemy - el;

      let nIC = nextIndexCalculated;
      // no moving out of the board up or down
      if (nIC < 0 || nIC > boardSize * boardSize - 1) {
        continue;
      }
      // no moving out of the board left or right
      // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];
      if (
        (enemy % boardSize === 0 &&
          // nw                     w            sw
          (el === 10 || el === 1 || el === -8)) ||
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
      // if it is possible to kill hero, this will be only possible option to move
      if (nIC === heroIndexToMove) {
        possiblePositions.splice(0, possiblePositions.length, heroIndexToMove);
        break;
      }
      // enemy won't collide with each other (with the enemy that is already next to it)
      if (enemies.indexOf(nIC) > -1) {
        continue;
      }

      possiblePositions.push(nIC);
    }
    // positions for single enemy
    let newPossiblePositions = [];

    // enemies won't enter the same location
    for (let el of possiblePositions) {
      if (nextEnemiesPositions.indexOf(el) === -1) {
        newPossiblePositions.push(el);
      }
    }
    // won't move if there is no possible positions
    if (newPossiblePositions.length === 0) {
      nextEnemiesPositions.push(enemy);
    }
    // killing hero
    if (
      newPossiblePositions.length === 1 &&
      newPossiblePositions[0] === heroIndexToMove
    ) {
      nextEnemiesPositions.push(heroIndexToMove);
      continue;
    }

    // new position based on directions enemies are facing
    if (newPossiblePositions.length >= 1) {
      let directionToMove = enemiesDirections[enemies.indexOf(enemy)];
      let indexToMove = enemy - directionToMove;

      if (newPossiblePositions.indexOf(indexToMove) > -1) {
        nextEnemiesPositions.push(indexToMove);
      } else {
        nextEnemiesPositions.push(enemy);
      }
    }
  }

  return nextEnemiesPositions;
}
