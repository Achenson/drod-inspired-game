import React from "react";

import { useState, useEffect } from "react";
import { ReactComponent as SwordSVG } from "../svgs/sword.svg";

import { HeroObj } from "../utils/interfaces";

interface Props {
  lastEnemyKilled: number | null;
  arrIndex: number;
  swordSize: string;
  hero: HeroObj;
}

function Hero({
  lastEnemyKilled,
  arrIndex,
  swordSize,
  hero,
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

  const [bodyMargins, setBodyMargins] = useState({
    marginTop: "auto",
    marginLeft: "auto",
  });

  const [heroDirection, setHeroDirection] = useState("");

  const [swordColor, setSwordColor] = useState<string>("");

  useEffect(() => {
    if (lastEnemyKilled === hero.swordPosition) {
      setSwordColor("fill-current text-red-600");
    } else {
      setSwordColor("");
    }
  }, [lastEnemyKilled, arrIndex, hero.swordPosition]);

  // let relativePosition = hero.heroPosition - hero.swordPosition;

  const [relativePosition, setRelativePosition] = useState<number>(9);

  useEffect(() => {
    setRelativePosition(hero.heroPosition - hero.swordPosition);
  }, [hero.heroPosition, hero.swordPosition]);

  useEffect(() => {

  

    switch (relativePosition) {
      case 9:
        setHeroDirection("transform");
        setBodyMargins({
          marginTop: "-26px",
          marginLeft: "0px",
        });

        break;
      case 8:
        setHeroDirection("transform rotate-45");
        setBodyMargins({
          marginTop: "-30px",
          marginLeft: "30px",
        });
        break;
      case -1:
        setHeroDirection("transform rotate-90");
        setBodyMargins({
          marginTop: "0px",
          marginLeft: "26px",
        });
        break;
      case -10:
        setHeroDirection("transform rotate-135");
        setBodyMargins({
          marginTop: "30px",
          marginLeft: "30px",
        });
        break;
      case -9:
        setHeroDirection("transform rotate-180");
        setBodyMargins({
          marginTop: "26px",
          marginLeft: "0px",
        });
        break;
      case -8:
        setHeroDirection("transform rotate-225");
        setBodyMargins({
          marginTop: "30px",
          marginLeft: "-30px",
        });
        break;
      case 1:
        setHeroDirection("transform -rotate-90");
        setBodyMargins({
          marginTop: "-0px",
          marginLeft: "-26px",
        });
        break;
      case 10:
        setHeroDirection("transform -rotate-45");
        setBodyMargins({
          /* 
          marginTop: "-30px",
          marginLeft: "-30px",
          */
          marginTop: "-24px",
          marginLeft: "-24px",
        });
        break;
    }
  }, [relativePosition, hero.swordPosition]);

  return (
    <div style={bodyMargins}>
      <div className={`${heroDirection} relative`} style={{ ...heroBody }}>
        <SwordSVG
          className={`transform -rotate-45 ${swordSize} absolute 
          ${swordColor}
        }`}
          style={{
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
