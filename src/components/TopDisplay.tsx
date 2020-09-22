import React from 'react';

interface Props {
  boardWidth: number,
  textOnHover: string
}

function TopDisplay({boardWidth, textOnHover}: Props): JSX.Element{
    return (
        <div style={{width: `${boardWidth}px`}} className="bg-black h-6">
          <p className="text-white text-center">{textOnHover}</p>
        </div>
    )
};

export default TopDisplay;