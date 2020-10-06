import React from 'react';

interface Props {
  boardWidth: number,
  textOnDisplay: string
}




function TopDisplay({boardWidth, textOnDisplay}: Props): JSX.Element{
  
  
  const smallText = "No new record. Rewind (R) or try again (N)!"


  function smallTextRender() {
    if (smallText === textOnDisplay){
      return true;
    } else {
      return false
    }
  }
  


    return (
        <div style={{width: `${boardWidth}px`}} className="bg-black h-6 flex flex-col justify-center">
          <p className={`text-white text-center ${smallTextRender() ? "text-sm" : "text-base"}`}>{textOnDisplay}</p>
        </div>
    )
};

export default TopDisplay;