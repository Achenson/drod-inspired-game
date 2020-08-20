import React from "react";

interface BoardObj {
  [key: string]: string
}

interface Props {
  boardTile: number[];
  boardRendering: BoardObj;
  arrIndex: number;
}

function Tile({ boardTile, boardRendering, arrIndex }: Props): JSX.Element {
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

  let boardR = boardRendering[arrIndex];
  console.log("boardRendering");
  console.log(boardRendering);

  let entityColor;

  if (boardR === "empty") {
    entityColor = "bg-red-100";
  } else {
    entityColor = "bg-red-800";
  }

  return (
    <div className={`w-10 h-10 ${backgroundColor}`}>
      {boardTile[0]}
      {boardTile[1]}
      <div className={`w-5 h-5 ${entityColor}`}></div>
    </div>
  );
}

export default Tile;
