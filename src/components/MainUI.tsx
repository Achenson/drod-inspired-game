import React from "react";
import Board from "./Board";

interface Props {}

function MainUI({}: Props): JSX.Element {

  let board = makeBoard(8, 8);

  function makeBoard(x: number, y: number) {
    let boardArr = [];

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        let cordinateArr = [];
        cordinateArr.push(i);
        cordinateArr.push(j);

        boardArr.push(cordinateArr);
      }
    }

    console.log(boardArr);

    return boardArr;
  }

  return (
    <Board board={board}/>
  )

}

export default MainUI;
