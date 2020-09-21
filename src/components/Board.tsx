import React from "react";
import Tile from "./Tile";

import { HeroObj } from "../utils/interfaces";

interface Props {
  board: number[][];
  boardWidth: number;
  boardSize: number;
  hero: HeroObj;
  enemies: Array<number | null>;
  currentTurn: number;
  lastEnemyKilled: (number | null);
  enemiesDirections: number[];
}

function Board({ board, boardSize, hero, enemies, currentTurn, lastEnemyKilled, enemiesDirections, boardWidth }: Props): JSX.Element {
  // const boardWidth = boardSize * 32;

  return (
    <div
      className={`grid grid-cols-${boardSize} col-gap-0 invisible`}
      style={{ width: `${boardWidth}px`}}
    >
      {board.map((el, i) => {
        return (
          <Tile
            boardTile={el}
            hero={hero}
            key={i}
            arrIndex={i}
            enemies={enemies}
            currentTurn={currentTurn}
            lastEnemyKilled={lastEnemyKilled}
            enemiesDirections={enemiesDirections}
          />
        );
      })}
    </div>
  );
}

export default Board;
