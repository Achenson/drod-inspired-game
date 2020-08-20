import React from "react";
import Board from "./Board";
import { useState } from "react";

interface Props {}

// unknown key name, unkown number of keys
interface BoardObj {
  [key: string]: string;
}

function MainUI({}: Props): JSX.Element {
  let board = makeBoard(9, 9);

  let boardObj: BoardObj = {};

  // boardMap.set(arrEl, "full");
  // console.log(boardMap.get(arrEl));

  for (let i = 0; i < board.length; i++) {
    boardObj[i] = "empty";
  }

  boardObj[40] = "hero";

  boardObj[31] = "sword-n";
  boardObj[32] = "sword-ne";
  boardObj[41] = "sword-e";
  boardObj[50] = "sword-se";
  boardObj[49] = "sword-s";
  boardObj[48] = "sword-sw";
  boardObj[39] = "sword-w";
  boardObj[30] = "sword-nw";

  boardObj[4] = "enemy";

  const [boardRendering, setBoardRendering] = useState(boardObj);

  // setBoardRendering({...boardRendering, 6: "full"})

  function makeBoard(x: number, y: number): number[][] {
    let boardArr: number[][] = [];

    for (let j = y; j > 0; j--) {
      for (let i = 1; i <= x; i++) {
        let cordinateArr: number[] = [];
        cordinateArr.push(i);
        cordinateArr.push(j);

        boardArr.push(cordinateArr);
      }
    }

    // console.log(boardArr);

    return boardArr;
  }

  return (
    <div className="mx-64 my-64">
      <Board board={board} boardRendering={boardRendering} />
    </div>
  );
}

export default MainUI;
