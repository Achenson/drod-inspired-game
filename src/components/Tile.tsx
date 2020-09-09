import React from "react";
import { useState, useEffect } from "react";

import { HeroObj } from "../utils/interfaces";

import { ReactComponent as SwordSVG } from "../svgs/sword.svg";
import { ReactComponent as BugSVG } from "../svgs/malware-virus.svg";
import { ReactComponent as DeathSVG } from "../svgs/bone-dog.svg";

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
  const [deathSVG, setDeathSVG] = useState("hidden");


  let relativePosition = hero.heroPosition - hero.swordPosition;

  const swordSize = "w-6 h-10";

  const [swordVisibility, setSwordVisibility] = useState("hidden");

  let swordDirection = "";

  //                                      nw  n ne   e   se   s  sw  w
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  switch (relativePosition) {
    case 9:
      swordDirection = "transform -rotate-45";
      break;
    case 8:
      swordDirection = "";
      break;
    case -1:
      swordDirection = "transform rotate-45";
      break;
    case -10:
      swordDirection = "transform rotate-90";
      break;
    case -9:
      swordDirection = "transform rotate-135";
      break;
    case -8:
      swordDirection = "transform rotate-180";
      break;
    case 1:
      swordDirection = "transform rotate-225";
      break;
    case 10:
      swordDirection = "transform -rotate-90 ";
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

  let enemyPulsing = "";

  let heroRelativePostion = arrIndex - hero.heroPosition;

  if (adjacentTilesRelativePositions.indexOf(heroRelativePostion) > -1) {
    enemyPulsing = "animate-pulse";
  }

  useEffect(() => {
    if (hero.heroPosition === arrIndex && !hero.alive) {
      // setEntityCSS("w-5 h-5 bg-black");
      setEntityCSS("hidden");
      setEnemySVG("hidden");
      setSwordVisibility("hidden");
      setDeathSVG("h-8");
      return;
      // return;
    }

    if (hero.heroPosition === arrIndex && hero.alive) {
      setEntityCSS("w-4 h-4 bg-green-600 rounded-full");
      setSwordVisibility("hidden");
      setDeathSVG("hidden");
      return;
    }

    if (
      hero.swordPosition === arrIndex &&
      hero.alive &&
      lastEnemyKilled === arrIndex
    ) {
      // setEntityCSS(`${bloodyswordDirection} ${swordSize} ${bloodySwordColor}`);
      setSwordVisibility(
        `visible ${swordDirection} ${swordSize} fill-current text-red-600`
      );
      setEntityCSS("hidden");
      // setEntityCSS("w-6 h-6 bg-red-600 absolute");
      setDeathSVG("hidden");
      return;
    }

    if (hero.swordPosition === arrIndex && hero.alive) {
      // setEntityCSS(`${swordDirection} ${swordSize} ${swordColor}`);
      setEntityCSS("hidden");
      setSwordVisibility(`visible ${swordDirection} ${swordSize}`);
      setDeathSVG("hidden");
      return;
    }

    // newly arrived enemy color for 1 turn
    if (
      arrIndex === enemies[enemies.length - 1] &&
      currentTurn % 2 === 0 &&
      currentTurn !== 1 &&
      currentTurn !== 0
    ) {
      setEntityCSS("hidden");
      setSwordVisibility("hidden");
      setEnemySVG(`${enemySVGvar} fill-current text-red-900 h-6`);
      setDeathSVG("hidden");
      return;
    }

    if (enemies.indexOf(arrIndex) > -1) {
      setEntityCSS("hidden");
      setSwordVisibility("hidden");
      // setEnemySVG("h-8 fill-current text-red-600")
      setEnemySVG(`${enemySVGvar} fill-current text-red-600 h-6`);
      setDeathSVG("hidden");
      return;
    }

    setSwordVisibility("hidden");
    setEnemySVG("hidden");
    setEntityCSS("hidden");
    setDeathSVG("hidden");
  }, [
    hero,
    arrIndex,
    enemies,
    swordDirection,
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
      <SwordSVG className={`${swordVisibility} ${swordDirection}`} />

      <BugSVG className={`${enemySVG} ${enemyPulsing}`}/>
      <DeathSVG className={`${deathSVG}`}/>

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`${enemySVG} ${enemyPulsing}`}
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg> */}

      {/* <SwordSVG/> */}
    </div>
  );
}

export default Tile;
