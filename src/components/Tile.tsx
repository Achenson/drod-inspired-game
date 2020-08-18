import React from "react";

interface Props {
  boardTile: number[];
}

function Tile({ boardTile }: Props): JSX.Element {
  //  let backgroundColor = "w-10 h-10 bg-gray-300";
   let backgroundColor;

  if (
    (boardTile[0] % 2 === 0 && boardTile[1] % 2 === 0) ||
    (boardTile[0] % 2 !== 0 && boardTile[1] % 2 !== 0)
  ) {
    backgroundColor = "w-10 h-10 bg-gray-200";
  } else {
    backgroundColor = "w-10 h-10 bg-gray-400";
  } 

  return (
    <div className={backgroundColor}>
      {boardTile[0]}
      {boardTile[1]}
    </div>
  );
}

export default Tile;
