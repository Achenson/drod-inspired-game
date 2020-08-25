import React from "react";
import { useState, useEffect } from "react";

interface BoardObj {
  [key: string]: string;
}

interface Props {
  boardTile: number[];
  arrIndex: number;
  hero: HeroObj;
  enemies: Array<number | null>;
}

interface HeroObj {
  heroPosition: number;
  alive: boolean;
  swordPosition: number;
}

function Tile({ boardTile, arrIndex, hero, enemies }: Props): JSX.Element {
  //  let backgroundColor = "w-10 h-10 bg-gray-300";
  let backgroundColor;

  if (
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

  //                                            nw  n ne   e   se   s  sw  w
  // const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  switch (relativePosition) {
    case 9:
      swordCSS = "w-3 h-8 bg-blue-800 ";
      break;
    case 8:
      swordCSS = "w-3 h-8 bg-blue-800 transform rotate-45";
      break;
    case -1:
      swordCSS = "w-8 h-3 bg-blue-800 ";
      break;
    case -10:
      swordCSS = "w-3 h-8 bg-blue-800 transform -rotate-45 ";
      break;
    case -9:
      swordCSS = "w-3 h-8 bg-blue-800";
      break;
    case -8:
      swordCSS = "w-3 h-8 bg-blue-800 transform rotate-45";
      break;
    case 1:
      swordCSS = "w-8 h-3 bg-blue-800";
      break;
    case 10:
      swordCSS = "w-3 h-8 bg-blue-800 transform -rotate-45 ";
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
    if (hero.heroPosition !== arrIndex && hero.swordPosition !== arrIndex) {
      setEntityCSS("hidden");
    }

    if (hero.heroPosition === arrIndex) {
      setEntityCSS("w-5 h-5 bg-green-600 rounded-full");
    }

    if (hero.swordPosition === arrIndex) {
      setEntityCSS(`${swordCSS}`);
    }

    if (enemies.indexOf(arrIndex) > -1) {
      setEntityCSS("w-4 h-4 bg-red-800 transform rotate-45");
    }
  }, [hero, arrIndex]);

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
