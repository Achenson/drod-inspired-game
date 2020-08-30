import React from "react";
import Tile from "./Tile";

import { HeroObj } from "../utils/interfaces";

interface Props {
  board: number[][];
  boardSize: number;
  hero: HeroObj;
  enemies: Array<number | null>;
}

function Board({ board, boardSize, hero, enemies }: Props): JSX.Element {
  const boardWidth = boardSize * 40;

  return (
    <div
      className={`grid grid-cols-${boardSize} col-gap-0`}
      style={{ width: `${boardWidth}px` }}
    >
      {board.map((el, i) => {
        return (
          <Tile
            boardTile={el}
            hero={hero}
            key={i}
            arrIndex={i}
            enemies={enemies}
          />
        );
      })}
    </div>
  );
}

export default Board;
