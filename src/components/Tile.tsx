import React from "react";
import { useState, useEffect } from "react";

interface BoardObj {
  [key: string]: string;
}

interface Props {
  boardTile: number[];
  arrIndex: number;
  hero: HeroObj;
}

interface HeroObj {
  heroPosition: number;
  alive: boolean;
  swordPosition: number;
}

function Tile({ boardTile, arrIndex, hero }: Props): JSX.Element {
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

  useEffect(() => {

    if (hero.heroPosition !== arrIndex && hero.swordPosition !== arrIndex) {
      setEntityCSS("hidden");
    }


    if (hero.heroPosition === arrIndex) {
      setEntityCSS("w-5 h-5 bg-green-600 rounded-full");
    }

    if (hero.swordPosition === arrIndex) {
      setEntityCSS("w-3 h-8 bg-blue-800");
    }
  }, [hero, arrIndex]);

  // switch (boardElement) {
  //   case "empty":
  //     entityColor = "hidden";
  //     break;
  //   case "hero":
  //     entityColor = "w-5 h-5 bg-green-600 rounded-full";
  //     break;
  //   case "sword-n":
  //     entityColor = "w-3 h-8 bg-blue-800 ";
  //     break;
  //   case "sword-ne":
  //     entityColor = "w-3 h-8 bg-blue-800 transform rotate-45";
  //     break;
  //   case "sword-e":
  //     entityColor = "w-8 h-3 bg-blue-800 ";
  //     break;
  //   case "sword-se":
  //     entityColor = "w-3 h-8 bg-blue-800 transform -rotate-45 ";
  //     break;
  //   case "sword-s":
  //     entityColor = "w-3 h-8 bg-blue-800";
  //     break;
  //   case "sword-sw":
  //     entityColor = "w-3 h-8 bg-blue-800 transform rotate-45";
  //     break;
  //   case "sword-w":
  //     entityColor = "w-8 h-3 bg-blue-800";
  //     break;
  //   case "sword-nw":
  //     entityColor = "w-3 h-8 bg-blue-800 transform -rotate-45 ";
  //     break;
  //   case "enemy":
  //     entityColor = "w-4 h-4 bg-red-800 transform rotate-45";
  //     break;
  //   case "dead":
  //     entityColor = "w-5 h-5 bg-black";
  //     break;

  //   default:
  //     entityColor = "hidden";
  // }

  /*  if (boardR === "empty") {
    entityColor = "bg-red-100";
  } else {
    entityColor = "bg-red-800";
  } */

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
