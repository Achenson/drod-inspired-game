import React from "react";

import { useState, useEffect } from "react";
import { ReactComponent as SwordSVG } from "../svgs/sword.svg";

import { HeroObj } from "../utils/interfaces";

interface Props {
  heroDirection: string;
  bodyMargins: { marginTop: string; marginLeft: string };
  lastEnemyKilled: number | null;
  arrIndex: number;
  swordDirection: string;
  swordMargins: {
    marginTop: string;
    marginLeft: string;
  };
  swordSize: string;
  hero: HeroObj;
}

function Hero({
  heroDirection,
  bodyMargins,
  lastEnemyKilled,
  arrIndex,
  swordDirection,
  swordMargins,
  swordSize,
  hero
}: Props): JSX.Element {
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

  const [swordColor, setSwordColor] = useState<string>("");

  useEffect(() => {
    if (lastEnemyKilled === hero.swordPosition) {
      setSwordColor("fill-current text-red-600");
    } else {
      setSwordColor("");
    }
  }, [lastEnemyKilled, arrIndex]);




  return (
    <div style={bodyMargins}>
      <div className={`${heroDirection} relative`} style={{ ...heroBody }}>
        <SwordSVG
          className={`transform -rotate-45 ${swordSize} absolute 
          ${swordColor}
        }`}
          style={{
            // marginLeft: `${swordMargins.marginLeft}`,
            // marginTop: `${swordMargins.marginTop}`,
            bottom: "4px",
            left: "-7px",
          }}
        />

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
            borderRadius: "9px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Hero;
