import React from 'react';
import Tile from "./Tile";

interface BoardObj {
  [key: string]: string
}

interface Props {
  board: number[][];
  boardRendering: BoardObj;
}




function Board({board, boardRendering}: Props): JSX.Element{
    return (
      <div className="grid grid-cols-9 col-gap-0" style={{width: "360px"}}>
        {board.map( (el, i) => {
          return <Tile boardTile={el} boardRendering={boardRendering} key={i} arrIndex={i}/>
        })}

      </div>
    )
};

export default Board;