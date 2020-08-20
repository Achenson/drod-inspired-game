import React from "react";
import Board from "./Board";
import {useState} from "react";

interface Props {}

// unknown key name, unkown number of keys
interface BoardObj {
  [key: string]: string
}

function MainUI({}: Props): JSX.Element {
  let board = makeBoard(8, 8);

  
  let boardObj: BoardObj = {};

  // boardMap.set(arrEl, "full");
  // console.log(boardMap.get(arrEl));
  
  for (let i = 0; i < board.length; i++) {

    
    boardObj[i] = "empty"
    

  }

  boardObj[5] = "full";

 
  // console.log(boardMap.get(arrEl));
  // console.log(JSON.stringify(board, null, 2));

  const [boardRendering, setBoardRendering] = useState(boardObj);
  

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
  ) 
  
}

export default MainUI;
