import React from "react";
import Board from "./Board";
import { useState } from "react";

interface Props {}

// unknown key name, unkown number of keys
interface BoardObj {
  [key: string]: string;
}

// interface EnemiesObj {
//   [key: number]: (number | "dead");
// }

interface HeroObj {
  heroPosition: number,
  alive: boolean,
  swordPosition: number  
}




function MainUI({}: Props): JSX.Element {

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

  const [enemies, setEnemies] = useState<Array<number | null>>(
    [4]
  )
  const [hero, setHero] = useState<HeroObj>({
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  })


  // setBoardRendering({...boardRendering, 6: "full"})

  function makeBoard(x: number): number[][] {
    let boardArr: number[][] = [];

    for (let j = x; j > 0; j--) {
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
      <Board board={board} boardRendering={boardRendering} boardSize={boardSize} />
    </div>
  );
}

export default MainUI;
