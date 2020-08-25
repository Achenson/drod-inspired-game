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

enum Directions {
  nw = -10,
  n = -9,
  ne = -8,
  e = 1,
  se = 10,
  s = 9,
  sw = 8,
  w = -1,
  wait = 0,
}

function MainUI({}: Props): JSX.Element {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // !!!! without this everything will be recalculated from start - lag
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  const boardSize = 9;

  const adjacentTilesRelativeIndexes = [10, 9, 8, -1, -10, -9, -8, 1];

  let board = makeBoard(boardSize);

 

  const [enemies, setEnemies] = useState<Array<number | null>>([4]);

  const [hero, setHero] = useState<HeroObj>({
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  });

  
 
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

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyQ":
        console.log("q");
        rotateHero("anticlockwise");
        break;
      case "KeyW":
        console.log("w");
        rotateHero("clockwise");

        break;
      case "Numpad7":
        console.log("numpad 7");
        moveHero(Directions.nw);
        break;
      case "Numpad8":
        console.log("numpad 8");
        moveHero(Directions.n);
        break;
      case "Numpad9":
        console.log("numpad 9");
        moveHero(Directions.ne);
        break;
      case "Numpad4":
        console.log("numpad 4");
        moveHero(Directions.w);
        break;
      case "Numpad5":
        console.log("numpad 5");
        moveHero(Directions.wait);
        break;
      case "Numpad6":
        console.log("numpad 6");
        moveHero(Directions.e);
        break;
      case "Numpad1":
        console.log("numpad 1");
        moveHero(Directions.sw);
        break;
      case "Numpad2":
        console.log("numpad 2");
        moveHero(Directions.s);
        break;
      case "Numpad3":
        console.log("numpad 3");
        moveHero(Directions.se);
        break;
    }
  }

  function rotateHero(direction: "clockwise" | "anticlockwise") {


    let relativeSwordHeroPosition = hero.heroPosition - hero.swordPosition;

    let indexOfRelativeSwordHeroPosition = adjacentTilesRelativeIndexes.indexOf(
      relativeSwordHeroPosition
    );

    // to change???
    let swordPositionToAdd: number = 0;

    if (direction === "clockwise") {
      if (
        indexOfRelativeSwordHeroPosition ===
        adjacentTilesRelativeIndexes.length - 1
      ) {
        swordPositionToAdd = adjacentTilesRelativeIndexes[0];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativeIndexes[indexOfRelativeSwordHeroPosition + 1];
      }
    }

    if (direction === "anticlockwise") {
      if (indexOfRelativeSwordHeroPosition === 0) {
        swordPositionToAdd =
          adjacentTilesRelativeIndexes[adjacentTilesRelativeIndexes.length - 1];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativeIndexes[indexOfRelativeSwordHeroPosition - 1];
      }
    }

    let swordIndexToMove = hero.heroPosition - swordPositionToAdd;

    // console.log("swordIndexToMove");
    // console.log(swordIndexToMove);

    if(swordIndexToMove <0) {
      return;
    }

    console.log(board[swordIndexToMove][0]);
    
    console.log(board[swordIndexToMove][1]);

    if (
      // board x,y cordinates go from 0 to boardSize-1
      board[swordIndexToMove][0] > boardSize - 1 ||
      board[swordIndexToMove][0] < 0 ||
      board[swordIndexToMove][1] > boardSize - 1 ||
      board[swordIndexToMove][1] < 0
    ) {
      return;
    }

    setHero({...hero, swordPosition: swordIndexToMove})


    // console.log("hero swordPosition");
    // console.log(hero.swordPosition);

    //return if here would move out of the board (sword)

  }

  function moveHero(direction: Directions) {
    // direction === 0 in case of "wait" btn
    if (direction === 0) {
      return;
    }

    let heroIndexToMove = hero.heroPosition + direction;
    let swordIndexToMove = hero.swordPosition + direction;

    // console.log("heroIndexToMOve");
    // console.log(heroIndexToMove);
    // console.log("swordIndexToMOve");
    // console.log(swordIndexToMove);




    if(heroIndexToMove <0 || swordIndexToMove <0) {
      return;
    }

    console.log(board[heroIndexToMove][0]);
    console.log(board[heroIndexToMove][1]);
    

      //return if here would move out of the board (hero or sword)
      if (
        // board x,y cordinates go from 0 to boardSize-1
        board[heroIndexToMove][0] > boardSize - 1 ||
        board[heroIndexToMove][0] < 0 ||
        board[heroIndexToMove][1] > boardSize - 1 ||
        board[heroIndexToMove][1] < 0||
        board[swordIndexToMove][0] > boardSize - 1 ||
        board[swordIndexToMove][0] < 0 ||
        board[swordIndexToMove][1] > boardSize - 1 ||
        board[swordIndexToMove][1] < 0
       
        
      ) {
        console.log("OUT");
        return;
      }


    setHero({...hero, swordPosition: swordIndexToMove, heroPosition: heroIndexToMove})

  
  }

  return (
    <div className="mx-64 my-64">
      <Board
        board={board}
        boardSize={boardSize}
        hero={hero}
      />
    </div>
  );
}

export default MainUI;
