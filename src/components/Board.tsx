import React from 'react';
import Tile from "./Tile";

interface BoardObj {
  [key: string]: string
}

interface HeroObj {
  heroPosition: number;
  alive: boolean;
  swordPosition: number;
}

interface Props {
  board: number[][];
  boardSize: number;
  hero: HeroObj 
}




function Board({board, boardSize, hero}: Props): JSX.Element{


  const boardWidth = boardSize * 40;


    return (
      <div className={`grid grid-cols-${boardSize} col-gap-0`} style={{width: `${boardWidth}px`}}>
        {board.map( (el, i) => {
          return <Tile boardTile={el} hero={hero} key={i} arrIndex={i}/>
        })}

      </div>
    )
};

export default Board;