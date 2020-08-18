import React from 'react';
import Tile from "./Tile";

interface Props {
  board: number[][];
}

function Board({board}: Props): JSX.Element{
    return (
      <div className="grid grid-cols-8 col-gap-0" style={{width: "320px"}}>
        {board.map( (el, i) => {
          return <Tile boardTile={el} key={i}/>
        })}

      </div>
    )
};

export default Board;