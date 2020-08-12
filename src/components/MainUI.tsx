import React from "react";
import Board from "./Board";

interface Props {}

function MainUI({}: Props): JSX.Element {
  let board = makeBoard(8, 8);

  function makeBoard(x: number, y: number): number[][] {
    let boardArr: number[][] = [];

    for (let i = 1; i <= x; i++) {
    for (let j = y; j > 0; j--) {
      

        let cordinateArr: number[] = [];
        cordinateArr.push(i);
        cordinateArr.push(j);

        boardArr.push(cordinateArr);
      }
    }

    console.log(boardArr);

    return boardArr;
  }

  return (
    <div className="mx-64 my-64">
      <Board board={board} />;
    </div>
  ) 
  
}

export default MainUI;
