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
  enemiesDirections: number[];
}

function Tile({
  boardTile,
  arrIndex,
  hero,
  enemies,
  currentTurn,
  lastEnemyKilled,
  enemiesDirections,
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
  const [enemySVG, setEnemySVG] = useState("hidden");

  let relativePosition = hero.heroPosition - hero.swordPosition;

  const swordSize = "w-2 h-6";
  const swordColor = "bg-blue-800";
  const bloodySwordColor = "bg-red-800";

  let swordCSS = "";
  let bloodySwordCSS = "";

  //                                      nw  n ne   e   se   s  sw  w
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  switch (relativePosition) {
    case 9:
      swordCSS = "";
      bloodySwordCSS = "";
      break;
    case 8:
      swordCSS = "transform rotate-45";
      bloodySwordCSS = "transform rotate-45";
      break;
    case -1:
      swordCSS = "transform rotate-90";
      bloodySwordCSS = "transform rotate-90";
      break;
    case -10:
      swordCSS = "transform -rotate-45";
      bloodySwordCSS = "transform -rotate-45";
      break;
    case -9:
      swordCSS = "";
      bloodySwordCSS = "";
      break;
    case -8:
      swordCSS = "transform rotate-45";
      bloodySwordCSS = "transform rotate-45";
      break;
    case 1:
      swordCSS = "transform rotate-90";
      bloodySwordCSS = "transform rotate-90";
      break;
    case 10:
      swordCSS = "transform -rotate-45 ";
      bloodySwordCSS = "transform -rotate-45";
      break;
  }

  let enemySVGvar = "hidden";

  switch (enemiesDirections[enemies.indexOf(arrIndex)]) {
    case 9:
      enemySVGvar = "";
      break;
    case 8:
      enemySVGvar = "transform rotate-45";
      break;
    case -1:
      enemySVGvar = "transform rotate-90";

      break;
    case -10:
      enemySVGvar = "transform rotate-135";

      break;
    case -9:
      enemySVGvar = "transform rotate-180";

      break;
    case -8:
      enemySVGvar = "transform rotate-225";

      break;
    case 1:
      enemySVGvar = "transform -rotate-90";

      break;
    case 10:
      enemySVGvar = "transform -rotate-45 ";
      break;
  }

  let enemySpining = "";

  let heroRelativePostion = arrIndex - hero.heroPosition;

  if (adjacentTilesRelativePositions.indexOf(heroRelativePostion) > -1) {
    enemySpining = " animate-pulse";
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
      setEnemySVG("hidden");
      return;
      // return;
    }

    // if (hero.heroPosition === arrIndex && ) {
    //   setEntityCSS("w-5 h-5 bg-black");
    //   return;
    //   // return;
    // }

    if (hero.heroPosition === arrIndex && hero.alive) {
      setEntityCSS("w-4 h-4 bg-green-600 rounded-full");
      return;
    }

    if (
      hero.swordPosition === arrIndex &&
      hero.alive &&
      lastEnemyKilled === arrIndex
    ) {
      setEntityCSS(`${bloodySwordCSS} ${swordSize} ${bloodySwordColor}`);
      return;
    }

    if (hero.swordPosition === arrIndex && hero.alive) {
      setEntityCSS(`${swordCSS} ${swordSize} ${swordColor}`);
      return;
    }

    // newly arrived enemy color for 1 turn
    // if (
    //   arrIndex === enemies[enemies.length - 1] &&
    //   currentTurn % 2 === 0 &&
    //   currentTurn !== 1 &&
    //   currentTurn !== 0
    // ) {
    //   setEntityCSS("w-4 h-4 bg-red-900 transform rotate-45");
    //   return;
    // }

    // if (enemies.indexOf(arrIndex) > -1) {
    //   setEntityCSS("w-4 h-4 bg-red-600 transform rotate-45");
    //   return;
    // }

    // newly arrived enemy color for 1 turn
    if (
      arrIndex === enemies[enemies.length - 1] &&
      currentTurn % 2 === 0 &&
      currentTurn !== 1 &&
      currentTurn !== 0
    ) {
      // console.log("current turn");
      // console.log(currentTurn);
      // console.log("arrIndex");
      // console.log(arrIndex);
      // console.log("should be brown")
      setEntityCSS("hidden");
      setEnemySVG(`${enemySVGvar} fill-current text-red-900 h-8`);

      return;
    }

    if (enemies.indexOf(arrIndex) > -1) {
      setEntityCSS("hidden");
      // setEnemySVG("h-8 fill-current text-red-600")
      setEnemySVG(`${enemySVGvar}  fill-current text-red-600 h-8`);
      return;
    }

    setEnemySVG("hidden");
    setEntityCSS("hidden");
  }, [
    hero,
    arrIndex,
    enemies,
    swordCSS,
    bloodySwordCSS,
    currentTurn,
    enemySVGvar,
    lastEnemyKilled,
  ]);

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 ${backgroundColor}`}
    >
      {/* {boardTile[0]} */}
      {/* {boardTile[1]} */}
      {/* {arrIndex} */}
      <div className={`${entityCSS}`}></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`${enemySVG}${enemySpining}`}
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default Tile;
