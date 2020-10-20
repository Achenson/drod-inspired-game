import React from "react";

interface Props {
  heroDirection: string;
  bodyMargins: { marginTop: string; marginLeft: string };
}

function Hero({ heroDirection, bodyMargins }: Props): JSX.Element {
  let heroBody = {
    backgroundColor: "green",
    height: "10px",
    width: "10px",
    // more than certain value  - hero is not rendered properly on chrome
   borderRadius: "25%",
  };


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

  return (
    <div style={bodyMargins}>
      <div className={`${heroDirection} relative`} style={{ ...heroBody }}>
        <div
          className={`w-3 h-3 bg-yellow-500 rounded-full z-30`}
          style={{ position: "absolute", top: "7px", left: "-1px" }}
        >
          <div style={halfACircle}></div>
        </div>
        <div
          className="absolute z-20"
          style={{
            backgroundColor: "green",
            top: "3px",
            left: "-8px",
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
