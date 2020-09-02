import React from "react";
import { useState, useEffect } from "react";

import { HeroObj } from "../utils/interfaces";

interface Props {
  boardTile: number[];
  arrIndex: number;
  hero: HeroObj;
  enemies: Array<number | null>;
  currentTurn: number;
  lastEnemyKilled: number | null;
}

function Tile({
  boardTile,
  arrIndex,
  hero,
  enemies,
  currentTurn,
  lastEnemyKilled,
}: Props): JSX.Element {
  //  let backgroundColor = "w-10 h-10 bg-gray-300";
  let backgroundColor;

  const corners = [0, 8, 72, 80];

  if (corners.indexOf(arrIndex) > -1) {
    backgroundColor = "bg-gray-600";
  } else if (
    (boardTile[0] % 2 === 0 && boardTile[1] % 2 === 0) ||
    (boardTile[0] % 2 !== 0 && boardTile[1] % 2 !== 0)
  ) {
    backgroundColor = "bg-gray-200";
  } else {
    backgroundColor = "bg-gray-400";
  }

  // let boardElement = boardRendering[arrIndex];
  // console.log("boardRendering");
  // console.log(boardRendering);

  const [entityCSS, setEntityCSS] = useState("hidden");

  let relativePosition = hero.heroPosition - hero.swordPosition;

  let swordCSS = "w-3 h-8 bg-blue-800";
  let bloodySwordCSS = "w-3 h-8 bg-red-800";

  //                                            nw  n ne   e   se   s  sw  w
  // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  switch (relativePosition) {
    case 9:
      swordCSS = "w-3 h-8 bg-blue-800 ";
      bloodySwordCSS = "w-3 h-8 bg-red-800";
      break;
    case 8:
      swordCSS = "w-3 h-8 bg-blue-800 transform rotate-45";
      bloodySwordCSS = "w-3 h-8 bg-red-800 transform rotate-45";
      break;
    case -1:
      swordCSS = "w-8 h-3 bg-blue-800 ";
      bloodySwordCSS = "w-8 h-3 bg-red-800";
      break;
    case -10:
      swordCSS = "w-3 h-8 bg-blue-800 transform -rotate-45";
      bloodySwordCSS = "w-3 h-8 bg-red-800 transform -rotate-45";
      break;
    case -9:
      swordCSS = "w-3 h-8 bg-blue-800";
      bloodySwordCSS = "w-3 h-8 bg-red-800";
      break;
    case -8:
      swordCSS = "w-3 h-8 bg-blue-800 transform rotate-45";
      bloodySwordCSS = "w-3 h-8 bg-red-800 transform rotate-45";
      break;
    case 1:
      swordCSS = "w-8 h-3 bg-blue-800";
      bloodySwordCSS = "w-8 h-3 bg-red-800";
      break;
    case 10:
      swordCSS = "w-3 h-8 bg-blue-800 transform -rotate-45 ";
      bloodySwordCSS = "w-3 h-8 bg-red-800 transform -rotate-45";
      break;
  }

  /* 
        case "enemy":
      swordCSS = "w-4 h-4 bg-red-800 transform rotate-45";
      break;
    case "dead":
      swordCSS = "w-5 h-5 bg-black";
      break;
      */

  useEffect(() => {
    if (hero.heroPosition === arrIndex && !hero.alive) {
      setEntityCSS("w-5 h-5 bg-black");
      return;
      // return;
    }

    // if (hero.heroPosition === arrIndex && ) {
    //   setEntityCSS("w-5 h-5 bg-black");
    //   return;
    //   // return;
    // }

    if (hero.heroPosition === arrIndex && hero.alive) {
      setEntityCSS("w-5 h-5 bg-green-600 rounded-full");
      return;
    }

    if (
      hero.swordPosition === arrIndex &&
      hero.alive &&
      lastEnemyKilled === arrIndex
    ) {
      setEntityCSS(`${bloodySwordCSS}`);
      return;
    }

    if (hero.swordPosition === arrIndex && hero.alive) {
      setEntityCSS(`${swordCSS}`);
      return;
    }

    // newly arrived enemy color for 1 turn
    if (
      arrIndex === enemies[enemies.length - 1] &&
      currentTurn % 2 === 0 &&
      currentTurn !== 1 &&
      currentTurn !== 0
    ) {
      setEntityCSS("w-4 h-4 bg-red-900 transform rotate-45");
      return;
    }

    if (enemies.indexOf(arrIndex) > -1) {
      setEntityCSS("w-4 h-4 bg-red-600 transform rotate-45");
      return;
    }

    setEntityCSS("hidden");
  }, [hero, arrIndex, enemies, swordCSS]);

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 ${backgroundColor}`}
    >
      {/* {boardTile[0]} */}
      {/* {boardTile[1]} */}
      {arrIndex}
      <div className={`${entityCSS}`}></div>
    </div>
  );
}

export default Tile;
