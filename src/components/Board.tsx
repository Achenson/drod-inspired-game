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
  lastEnemyKilled: number | null;
  enemiesDirections: number[];
  settingsVisibility: boolean;
  setSettingsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  helpVisibility: boolean;
  setHelpVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function Board({
  board,
  boardSize,
  hero,
  enemies,
  currentTurn,
  lastEnemyKilled,
  enemiesDirections,
  boardWidth,
  settingsVisibility,
  setSettingsVisibility,
  helpVisibility,
  setHelpVisibility,
}: Props): JSX.Element {
  // const boardWidth = boardSize * 32;

  return (
    <div
      onClick={() => {
        if (settingsVisibility) {
          setSettingsVisibility(false);
        }

        if (helpVisibility) {
          setHelpVisibility(false);
        }
      }}
    >
      <div
        className={`grid grid-cols-${boardSize} col-gap-0`}
        style={{
          width: `${boardWidth}px`,
          height: `${boardWidth}px`,
          backgroundColor: "whitesmoke",
        }}
      ></div>

      {/* <div
      className={`grid grid-cols-${boardSize} col-gap-0`}
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
    </div> */}
    </div>
  );
}

export default Board;
