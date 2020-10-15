import React from "react";

interface Props {
  heroDirection: string;
  triangleMargins: { marginTop: string; marginLeft: string };
}

function Hero({ heroDirection, triangleMargins }: Props): JSX.Element {
  let triangleBody = {
    borderBottom: "24px solid green",
    borderLeft: "12px solid transparent",
    borderRight: "12px solid transparent",
    height: "0",
    width: "30px",
    // more than 40% - hero is not rendered properly on chrome
    // borderRadius: "40%",
    borderRadius: "40%",
    // marginTop: "auto"
    
  };

  /* 
    borderBottom: "28px solid green",
    borderLeft: "12px solid transparent",
    borderRight: "12px solid transparent",
    height: "0",
    width: "30px",
    // more than 40% - hero is not rendered properly on chrome
    // borderRadius: "40%",
    borderRadius: "40%"
    // marginTop: "auto"
  */

  let halfACircle = {
    background: "black",
    height: "8px",
    width: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    borderTopRightRadius: "6px",
    borderTopLeftRadius: "6px",
    marginTop: "4px",
  };

  let heroHands = {
    borderBottom: "5px solid #ecc94b",
    borderLeft: "2px solid transparent",
    borderRight: "2px solid transparent",
    height: "0",
    width: "10px",
    borderRadius: "30% 30% 30% 30%",
    left: "-2px",
  };

  return (
    <div style={triangleMargins}>
      {/* <div className={`${heroVisibility}`} style={{position: "absolute"}}></div> */}
      <div className={`${heroDirection} relative`} style={{ ...triangleBody }}>
        <div className="absolute" style={heroHands}>
          {/* <div className="absolute" style={lineBetween}></div> */}
        </div>
        <div
          className={`w-3 h-3 bg-yellow-500 rounded-full z-40`}
          style={{ position: "absolute", top: "11px", left: "-3px" }}
        >
          <div style={halfACircle}></div>
        </div>
        <div
          className="absolute z-30"
          style={{
            backgroundColor: "green",
            top: "6px",
            left: "-10px",
            width: "26px",
            height: "20px",
            borderRadius: "9px"
          }}
        ></div>
      </div>
    </div>
  );
}

export default Hero;