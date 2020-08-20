import React from 'react';
import Tile from "./Tile";

interface BoardObj {
  [key: string]: string
}

interface Props {
  board: number[][];
  boardRendering: BoardObj;
  boardSize: number;
}




function Board({board, boardRendering, boardSize}: Props): JSX.Element{


  const boardWidth = boardSize * 40;


    return (
      <div className={`grid grid-cols-${boardSize} col-gap-0`} style={{width: `${boardWidth}px`}}>
        {board.map( (el, i) => {
          return <Tile boardTile={el} boardRendering={boardRendering} key={i} arrIndex={i}/>
        })}

      </div>
    )
};

export default Board;