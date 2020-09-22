import React from 'react';

interface Props {
  boardWidth: number
}

function TopDisplay({boardWidth}: Props): JSX.Element{
    return (
        <div style={{width: `${boardWidth}px`}} className="bg-black h-6">
          <p className="text-white text-center">Test</p>
        </div>
    )
};

export default TopDisplay;