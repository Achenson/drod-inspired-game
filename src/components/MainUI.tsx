import React, { ReactElement, ReactEventHandler, createElement } from "react";
import Board from "./Board";
import { useState, useEffect } from "react";
import Turns from "./Turns";

import { HeroObj } from "../utils/interfaces";
import { Directions } from "../utils/interfaces";

import makeBoard from "../utils/makeBoard";
import moveHero from "../utils/moveHero";
import rotateHero from "../utils/rotateHero";
import moveEnemies from "../utils/moveEnemies";
import createEnemy from "../utils/createEnemy";

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

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyQ":
        console.log("q");
        rotateHero(
          "anticlockwise",
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn
        );
        break;
      case "KeyW":
        console.log("w");
        rotateHero(
          "clockwise",
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn
        );

        break;
      case "Numpad7":
        console.log("numpad 7");
        moveHero(
          Directions.nw,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad8":
        console.log("numpad 8");
        moveHero(
          Directions.n,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad9":
        console.log("numpad 9");
        moveHero(
          Directions.ne,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad4":
        console.log("numpad 4");
        moveHero(
          Directions.w,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad5":
        console.log("numpad 5");
        moveHero(
          Directions.wait,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad6":
        console.log("numpad 6");
        moveHero(
          Directions.e,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad1":
        console.log("numpad 1");
        moveHero(
          Directions.sw,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad2":
        console.log("numpad 2");
        moveHero(
          Directions.s,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
      case "Numpad3":
        console.log("numpad 3");
        moveHero(
          Directions.se,
          setHero,
          setEnemies,
          setEnemiesKilled,
          currentTurn,
          setCurrentTurn,
          hero,
          enemies,
          adjacentTilesRelativePositions,
          board,
          boardSize
        );
        break;
    }
  }

  function heroMovement(
    directionToMove: "clockwise" | "anticlockwise" | Directions
  ) {
    if (
      directionToMove === "clockwise" ||
      directionToMove === "anticlockwise"
    ) {
      rotateHero(
        directionToMove,
        hero,
        enemies,
        adjacentTilesRelativePositions,
        board,
        boardSize,
        setHero,
        setEnemies,
        setEnemiesKilled,
        currentTurn,
        setCurrentTurn
      );
    } else {
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
        board,
        boardSize
      );
    }
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
