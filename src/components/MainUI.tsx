import React, { ReactElement, ReactEventHandler } from "react";
import Board from "./Board";
import { useState, useEffect } from "react";
import Turns from "./Turns";

interface Props {}

// unknown key name, unkown number of keys
interface BoardObj {
  [key: string]: string;
}

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
    };
  });

  const boardSize = 9;
  // starts with sword NW of hero
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  let board = makeBoard(boardSize);

  // const [turnsPassed, setTurnsPassed] = useState()

  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [enemiesKilled, setEnemiesKilled] = useState<number>(0);
  // const [enemies, setEnemies] = useState<Array<number | null>>([4]);
  const [enemies, setEnemies] = useState<Array<number>>([4]);

  const [hero, setHero] = useState<HeroObj>({
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  });

  // useEffect(() => {

  //   if(hero.heroPosition === enemies.indexOf(hero.heroPosition)) {
  //     setHero({...hero, alive: false})
  //   }

  // }, [hero, enemies])

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

  function handleKeyDown(
    event: KeyboardEvent,
  ) {
    switch (event.code) {
      case "KeyQ":
        console.log("q");
        rotateHero("anticlockwise", setHero, setEnemies, setEnemiesKilled);
        break;
      case "KeyW":
        console.log("w");
        rotateHero("clockwise", setHero, setEnemies, setEnemiesKilled);

        break;
      case "Numpad7":
        console.log("numpad 7");
        moveHero(Directions.nw, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad8":
        console.log("numpad 8");
        moveHero(Directions.n, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad9":
        console.log("numpad 9");
        moveHero(Directions.ne, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad4":
        console.log("numpad 4");
        moveHero(Directions.w, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad5":
        console.log("numpad 5");
        moveHero(Directions.wait, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad6":
        console.log("numpad 6");
        moveHero(Directions.e, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad1":
        console.log("numpad 1");
        moveHero(Directions.sw, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad2":
        console.log("numpad 2");
        moveHero(Directions.s, setHero, setEnemies, setEnemiesKilled);
        break;
      case "Numpad3":
        console.log("numpad 3");
        moveHero(Directions.se, setHero, setEnemies, setEnemiesKilled);
        break;
    }
  }

  function rotateHero(
    direction: "clockwise" | "anticlockwise",
    setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
    setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
    setEnemiesKilled: React.Dispatch<React.SetStateAction<number>>
  ) {
    let relativePosition = hero.heroPosition - hero.swordPosition;

    // indexOfRelativePosition taken from the array of all possible relative positions
    // "clockwise" circle between indexes to the right, "anticlockwise" the other way around
    let indexOfRelativePosition = adjacentTilesRelativePositions.indexOf(
      relativePosition
    );

    // to change???
    let swordPositionToAdd: number = 0;

    if (direction === "clockwise") {
      if (
        indexOfRelativePosition ===
        adjacentTilesRelativePositions.length - 1
      ) {
        swordPositionToAdd = adjacentTilesRelativePositions[0];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativePositions[indexOfRelativePosition + 1];
      }
    }

    if (direction === "anticlockwise") {
      if (indexOfRelativePosition === 0) {
        swordPositionToAdd =
          adjacentTilesRelativePositions[
            adjacentTilesRelativePositions.length - 1
          ];
      } else {
        swordPositionToAdd =
          adjacentTilesRelativePositions[indexOfRelativePosition - 1];
      }
    }

    let swordIndexToMove = hero.heroPosition - swordPositionToAdd;

    //return if here would move sword out of the board up or down
    if (swordIndexToMove < 0 || swordIndexToMove > boardSize * boardSize - 1) {
      return;
    }

    //                                      nw  n ne   e   se   s  sw  w
    // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

    //return if here would move sword out of the board  left or right
    if (
      // board x,y cordinates go from 0 to boardSize-1
      (((relativePosition === -9 && board[hero.swordPosition][0] === 0) ||
        (relativePosition === 9 &&
          board[hero.swordPosition][0] === boardSize - 1)) &&
        direction === "clockwise") ||
      (((relativePosition === -9 &&
        board[hero.swordPosition][0] === boardSize - 1) ||
        (relativePosition === 9 && board[hero.swordPosition][0] === 0)) &&
        direction === "anticlockwise")
    ) {
      console.log("OUT");
      return;
    }

    console.log(board[swordIndexToMove][0]);
    console.log(board[swordIndexToMove][1]);

    let newEnemies = [...enemies];

    if (enemies.indexOf(swordIndexToMove) > -1) {
      // newEnemies[newEnemies.indexOf(swordIndexToMove)] = null;

      newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);

      setEnemies([...newEnemies]);
      setEnemiesKilled((n) => n + 1);
    }

    setHero({ ...hero, swordPosition: swordIndexToMove });

    // setEnemies([
    //   ...moveEnemies(
    //     newEnemies,
    //     boardSize,
    //     adjacentTilesRelativePositions,
    //     hero.heroPosition,
    //     hero.swordPosition
    //   ),
    // ]);

    moveEnemies(
      newEnemies,
      boardSize,
      adjacentTilesRelativePositions,
      hero.heroPosition,
      swordIndexToMove,
      // next position is the same as current
      hero.heroPosition,
      setHero,
      setEnemies
    );
  }

  function moveHero(
    direction: Directions,
    setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
    setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
    setEnemiesKilled: React.Dispatch<React.SetStateAction<number>>
  ) {
    // direction === 0 in case of "wait" btn
    if (direction === 0) {
      moveEnemies(
        enemies,
        boardSize,
        adjacentTilesRelativePositions,
        hero.heroPosition,
        hero.swordPosition,
        // next position is the same as current
        hero.heroPosition,
        setHero,
        setEnemies
      );

      return;
    }

    let heroIndexToMove = hero.heroPosition + direction;
    let swordIndexToMove = hero.swordPosition + direction;

    // console.log("heroIndexToMOve");
    // console.log(heroIndexToMove);
    // console.log("swordIndexToMOve");
    // console.log(swordIndexToMove);

    //return if here would move out of the board (hero or sword) up or down
    if (
      heroIndexToMove < 0 ||
      swordIndexToMove < 0 ||
      heroIndexToMove > boardSize * boardSize - 1 ||
      swordIndexToMove > boardSize * boardSize - 1
    ) {
      return;
    }

    //return if here would move out of the board (hero or sword) left or right
    if (
      // board x,y cordinates go from 0 to boardSize-1
      ((board[hero.heroPosition][0] === 0 ||
        board[hero.swordPosition][0] === 0) &&
        (direction === -10 || direction === 8 || direction === -1)) ||
      ((board[hero.heroPosition][0] === boardSize - 1 ||
        board[hero.swordPosition][0] === boardSize - 1) &&
        (direction === -8 || direction === 1 || direction === 10)) ||
      ((board[hero.heroPosition][0] === boardSize - 1 ||
        board[hero.swordPosition][0] === boardSize - 1) &&
        (direction === -8 || direction === 1 || direction === 10))
    ) {
      console.log("OUT");
      return;
    }

    let aliveBoolean = true;

    // if(heroIndexToMove === enemies[enemies.indexOf(heroIndexToMove)]) {
    if (enemies.indexOf(heroIndexToMove) > -1) {
      aliveBoolean = false;
      setHero({
        ...hero,
        swordPosition: swordIndexToMove,
        heroPosition: heroIndexToMove,
        alive: aliveBoolean,
      });
      return;
    }

    let newEnemies = [...enemies];
    if (enemies.indexOf(swordIndexToMove) > -1) {
      // newEnemies[newEnemies.indexOf(swordIndexToMove)] = null;

      newEnemies.splice(newEnemies.indexOf(swordIndexToMove), 1);
      setEnemies([...newEnemies]);
      setEnemiesKilled((n) => n + 1);
    }

    setHero({
      ...hero,
      swordPosition: swordIndexToMove,
      heroPosition: heroIndexToMove,
      alive: aliveBoolean,
    });

    // setEnemies([
    //   ...moveEnemies(
    //     newEnemies,
    //     boardSize,
    //     adjacentTilesRelativePositions,
    //     hero.heroPosition,
    //     hero.swordPosition
    //   ),
    // ]);
    moveEnemies(
      newEnemies,
      boardSize,
      adjacentTilesRelativePositions,
      hero.heroPosition,
      // hero.swordPosition,
      swordIndexToMove,
      heroIndexToMove,
      setHero,
      setEnemies
    );
  }

  function moveEnemies(
    enemies: number[],
    boardSize: number,
    adjacentTilesRelativePositions: number[],
    heroPosition: number,
    nextSwordPosition: number,
    heroIndexToMove: number,
    setHero: React.Dispatch<React.SetStateAction<HeroObj>>,
    setEnemies: React.Dispatch<React.SetStateAction<number[]>>,
  ) {
    let nextEnemiesPositions: number[] = [];

    // enemy === enemy's position on board
    for (let enemy of enemies) {
      let possiblePositions: number[] = [];

      for (let el of adjacentTilesRelativePositions) {
        const nextIndexCalculated = enemy - el;

        let nIC = nextIndexCalculated;

        // order is important! this must be before the next, otherwise enemy will stumble upon
        // the sword if chasing hero

        // no moving out of the board up or down
        if (nIC < 0 || nIC > boardSize * boardSize - 1) {
          continue;
        }

        // no moving out of the board left or right

        // starts with sword NW of hero
        // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

        // console.log(el);
        // console.log(enemy);
        // console.log(enemy % boardSize);

        if (
          (enemy % boardSize === 0 &&
            // nw                     w            sw
            (el === 10 || el === 1 || el === -8)) ||
          // (enemy % (boardSize - 1) === 0 &&
          ((enemy + 1) % boardSize === 0 &&
            // ne                     e            se
            (el === 8 || el === -1 || el === -10))
        ) {
          console.log("sth");

          continue;
        }

        // enemy won't kill itself on purpose
        if (nIC === nextSwordPosition) {
          continue;
        }

        // if it is possible to kill hero(or chase him), this will be only possible option to move
        if (nIC === heroPosition) {
          possiblePositions.splice(0, possiblePositions.length, heroPosition);
          break;
        }

        // enemy won't collide with each other
        if (enemies.indexOf(nextIndexCalculated) > -1) {
          continue;
        }

        // if(possiblePositions.indexOf(nIC) > -1) {
        //   possiblePositions.push(enemy)
        // }

        possiblePositions.push(nIC);
      }

      console.log("possiblePositions");
      console.log(possiblePositions);

      // won't move
      if (possiblePositions.length === 0) {
        nextEnemiesPositions.push(enemy);
      }

      // only 1 possible move
      // if (possiblePositions.length === 1) {

      //   initialNextEnemiesPositions.push(possiblePositions[0]);
      // }

      if (possiblePositions.length >= 1) {
        let randomNumber = makeRandomNumber(1, possiblePositions.length);

        let randomNextPosition = possiblePositions[randomNumber - 1];

        // if this nextPosition will be already taken by another enemy - don't move

        if (nextEnemiesPositions.indexOf(randomNextPosition) > -1) {
          nextEnemiesPositions.push(enemy);
        } else {
          nextEnemiesPositions.push(randomNextPosition);
        }
      }
    }

    console.log("nextEnemiesPositions");
    console.log(nextEnemiesPositions);

    // setEnemies([
    //   ...moveEnemies(
    //     newEnemies,
    //     boardSize,
    //     adjacentTilesRelativePositions,
    //     hero.heroPosition,
    //     hero.swordPosition
    //   ),
    // ]);

    // enemy kills if hero is adjacent & didn't move this turn
    // !!!! nextEnemiesPostions & heroIndexToMove belong to the same(2nd) turn
    if (nextEnemiesPositions.indexOf(heroIndexToMove) > -1) {
      setHero({ ...hero, alive: false });
    } else {
      // if hero is killed, round counter(how many turns you survived) doesn't go up
      setCurrentTurn((n) => n + 1);
      console.log(currentTurn);
    }

    if (currentTurn % 2 === 0 && currentTurn !== 0) {
      nextEnemiesPositions = [
        ...nextEnemiesPositions,
        createEnemy(
          nextEnemiesPositions,
          heroIndexToMove,
          nextSwordPosition,
          boardSize
        ),
      ];
    }

    setEnemies([...nextEnemiesPositions]);

    // return nextEnemiesPositions;
  }

  function createEnemy(
    nextEnemiesPositions: number[],
    heroIndexToMOve: number,
    nextSwordPosition: number,
    boardSize: number
  ): number {
    let possiblePositions = [];

    let takenPositions = [
      ...nextEnemiesPositions,
      heroIndexToMOve,
      nextSwordPosition,
    ];

    for (let i = 0; i < boardSize * boardSize - 1; i++) {
      if (takenPositions.indexOf(i) === -1) {
        possiblePositions.push(i);
      }
    }

    let randomIndex = makeRandomNumber(1, possiblePositions.length);

    let newEnemyPosition = possiblePositions[randomIndex - 1];

    console.log("newEnemyPosition");
    console.log(newEnemyPosition);
    return newEnemyPosition;
  }

  function makeRandomNumber(min: number, max: number) {
    let random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
  }

  return (
    <div className="mx-64 my-64">
      <Turns currentTurn={currentTurn} enemiesKilled={enemiesKilled} />
      <Board
        board={board}
        boardSize={boardSize}
        hero={hero}
        enemies={enemies}
      />
    </div>
  );
}

export default MainUI;
