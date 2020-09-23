import React from 'react';

interface Props {
  boardWidth: number,
  textOnDisplay: string
}

function TopDisplay({boardWidth, textOnDisplay}: Props): JSX.Element{
    return (
        <div style={{width: `${boardWidth}px`}} className="bg-black h-6">
          <p className="text-white text-center">{textOnDisplay}</p>
        </div>
    )
};

export default TopDisplay;