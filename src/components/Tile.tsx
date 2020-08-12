import React from 'react';

interface Props {
  boardTile: number[];
}

function Tile({boardTile}: Props): JSX.Element{
    return (
        <div>
          {boardTile[0]}{boardTile[1]}
        </div>
    )
};

export default Tile;