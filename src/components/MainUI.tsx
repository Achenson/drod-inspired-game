import React, { ReactElement, ReactEventHandler } from "react";
import Board from "./Board";
import { useState, useEffect } from "react";

interface Props {}

// unknown key name, unkown number of keys
interface BoardObj {
  [key: string]: string;
}

// interface EnemiesObj {
//   [key: number]: (number | "dead");
// }

interface HeroObj {
  heroPosition: number;
  alive: boolean;
  swordPosition: number;
}

function MainUI({}: Props): JSX.Element {
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  });

  const boardSize = 9;

  let board = makeBoard(boardSize);

  let boardObj: BoardObj = {};

  // boardMap.set(arrEl, "full");
  // console.log(boardMap.get(arrEl));

  for (let i = 0; i < board.length; i++) {
    boardObj[i] = "empty";
  }

  boardObj[40] = "hero";

  boardObj[31] = "sword-n";
  /*  boardObj[32] = "sword-ne";
  boardObj[41] = "sword-e";
  boardObj[50] = "sword-se";
  boardObj[49] = "sword-s";
  boardObj[48] = "sword-sw";
  boardObj[39] = "sword-w";
  boardObj[30] = "sword-nw"; */

  boardObj[4] = "enemy";
  // boardObj[5] = "dead";

  // let enemiesObj: EnemiesObj = {
  //   1: 4,
  // };

  // let heroObj: HeroObj {
  //   position: 40,
  //   alive: true;
  // }

  const [boardRendering, setBoardRendering] = useState<BoardObj>(boardObj);

  const [enemies, setEnemies] = useState<Array<number | null>>([4]);
  const [hero, setHero] = useState<HeroObj>({
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  });

  // setBoardRendering({...boardRendering, 6: "full"})

  function makeBoard(x: number): number[][] {
    let boardArr: number[][] = [];

    for (let j = x - 1; j >= 0; j--) {
      for (let i = 0; i < x; i++) {
        let cordinateArr: number[] = [];
        cordinateArr.push(i);
        cordinateArr.push(j);

        boardArr.push(cordinateArr);
      }
    }

    // console.log(boardArr);

    return boardArr;
  }

  function handleKeyPress(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyQ":
        console.log("q");
        break;
      case "KeyW":
        console.log("w");
        break;
      case "Numpad7":
        console.log("numpad 7");
        moveHero(Directions.nw);

        break;
      case "Numpad8":
        console.log("numpad 8");
        break;
      case "Numpad9":
        console.log("numpad 9");
        break;
      case "Numpad4":
        console.log("numpad 4");
        break;
      case "Numpad5":
        console.log("numpad 5");
        break;
      case "Numpad6":
        console.log("numpad 6");
        break;
      case "Numpad1":
        console.log("numpad 1");
        break;
      case "Numpad2":
        console.log("numpad 2");
        break;
      case "Numpad3":
        console.log("numpad 3");
        break;
    }
  }

  enum Directions {
    nw = -10,
    n = -9,
    ne = -8,
    e = 1,
    se = 10,
    s = 9,
    sw = 8,
    w = -1,
  }

  function moveHero(direction: Directions) {
    let tileIndexToMove = hero.heroPosition + direction;
    console.log("tileIndexToMOve");
    console.log(tileIndexToMove);

    //return if here would move out of the board
    if (
      // board x,y cordinates go from 0 to boardSize-1
      board[tileIndexToMove][0] > boardSize - 1 ||
      board[tileIndexToMove][0] < 0 ||
      board[tileIndexToMove][1] > boardSize - 1 ||
      board[tileIndexToMove][1]
    ) {
      return;
    }


  }

  return (
    <div className="mx-64 my-64">
      <Board
        board={board}
        boardRendering={boardRendering}
        boardSize={boardSize}
      />
    </div>
  );
}

export default MainUI;
