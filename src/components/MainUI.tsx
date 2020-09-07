import React, { ReactElement, ReactEventHandler, createElement } from "react";
import Board from "./Board";
import { useState, useEffect } from "react";
import Turns from "./Turns";

import { HeroObj } from "../utils/interfaces";
import { Directions } from "../utils/interfaces";

import makeBoard from "../utils/makeBoard";
import moveHero from "../utils/moveHero";

interface Props {}

function MainUI({}: Props): JSX.Element {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // !!!! without this everything will be recalculated from start - lag
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const boardSize = 9;
  // starts with sword NW of hero         nw
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  let board = makeBoard(boardSize);

  // const [turnsPassed, setTurnsPassed] = useState()

  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [recordScore, setRecordScore] = useState<string>("0");

  useEffect(() => {
    let record = localStorage.getItem("record");

    if (record) {
      setRecordScore(record);
    } else {
      localStorage.setItem("record", "0");
    }
  }, []);

  const [enemiesKilled, setEnemiesKilled] = useState<number>(0);
  // const [enemies, setEnemies] = useState<Array<number | null>>([4]);
  const [enemies, setEnemies] = useState<Array<number>>([4]);

 
  

 const [enemiesDirections, setEnemiesDirections] = useState<Array<number>>([-9])

  const [lastEnemyKilled, setLastEnemyKilled] = useState<number | null>(null);

  const [hero, setHero] = useState<HeroObj>({
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  });

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyQ":
        console.log("q");
        heroMovement(Directions.anticlockwise);
        break;
      case "KeyW":
        console.log("w");
        heroMovement(Directions.clockwise);
        break;
      case "Numpad7":
        console.log("numpad 7");
        heroMovement(Directions.nw);
        break;
      case "Numpad8":
        console.log("numpad 8");
        heroMovement(Directions.n);
        break;
      case "Numpad9":
        console.log("numpad 9");
        heroMovement(Directions.ne);
        break;
      case "Numpad4":
        console.log("numpad 4");
        heroMovement(Directions.w);
        break;
      case "Numpad5":
        console.log("numpad 5");
        heroMovement(Directions.wait);
        break;
      case "Numpad6":
        console.log("numpad 6");
        heroMovement(Directions.e);
        break;
      case "Numpad1":
        console.log("numpad 1");
        heroMovement(Directions.sw);
        break;
      case "Numpad2":
        console.log("numpad 2");
        heroMovement(Directions.s);
        break;
      case "Numpad3":
        console.log("numpad 3");
        heroMovement(Directions.se);
        break;
    }
  }

  function heroMovement(directionToMove: Directions) {
    moveHero(
      directionToMove,
      setHero,
      setEnemies,
      setEnemiesKilled,
      currentTurn,
      setCurrentTurn,
      hero,
      enemies,
      adjacentTilesRelativePositions,
      boardSize,
      setLastEnemyKilled,
      recordScore,
      setRecordScore,
      enemiesDirections,
      setEnemiesDirections
    );
  }

  return (
    <div className="mx-64 my-64">
      <Turns
        currentTurn={currentTurn}
        enemiesKilled={enemiesKilled}
        recordScore={recordScore}
        enemies={enemies}
      />
      <Board
        board={board}
        boardSize={boardSize}
        hero={hero}
        enemies={enemies}
        currentTurn={currentTurn}
        lastEnemyKilled={lastEnemyKilled}
        enemiesDirections={enemiesDirections}
      />
    </div>
  );
}

export default MainUI;
