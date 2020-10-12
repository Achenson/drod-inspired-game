import React from "react";
import { useState, useEffect } from "react";

import { HeroObj } from "../utils/interfaces";

import { ReactComponent as SwordSVG } from "../svgs/sword.svg";
import { ReactComponent as BugSVG } from "../svgs/malware-virus.svg";
import { ReactComponent as DeathSVG } from "../svgs/skull.svg";

interface Props {
  boardTile: number[];
  arrIndex: number;
  hero: HeroObj;
  enemies: Array<number | null>;
  currentTurn: number;
  lastEnemyKilled: number | null;
  enemiesDirections: number[];
}

function Tile({
  boardTile,
  arrIndex,
  hero,
  enemies,
  currentTurn,
  lastEnemyKilled,
  enemiesDirections,
}: Props): JSX.Element {
  const corners = [0, 8, 72, 80];

  let backgroundColor;

  if (corners.indexOf(arrIndex) > -1) {
    backgroundColor = "bg-gray-600";
  } else if (
    (boardTile[0] % 2 === 0 && boardTile[1] % 2 === 0) ||
    (boardTile[0] % 2 !== 0 && boardTile[1] % 2 !== 0)
  ) {
    backgroundColor = "bg-gray-200";
  } else {
    backgroundColor = "bg-gray-400";
  }

  let relativePosition = hero.heroPosition - hero.swordPosition;

  const swordSize = "w-6 h-10";

  let heroDirection = "";
  let swordDirection = "";

  //                                      nw  n ne   e   se   s  sw  w
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  let triangleBody = {
    borderBottom: "28px solid green",
    borderLeft: "12px solid transparent",
    borderRight: "12px solid transparent",
    height: "0",
    width: "30px",
    borderRadius: "50%",
    // marginTop: "auto"
  };

  let triangleMargins = { marginTop: "auto", marginLeft: "auto" };

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

  switch (relativePosition) {
    case 9:
      swordDirection = "transform -rotate-45";
      heroDirection = "";
      triangleMargins.marginTop = "-8px";
      triangleMargins.marginLeft = "1px";
      // setMarginForBody({...marginForBody, marginTop: "-8px"});
      break;
    case 8:
      swordDirection = "left-0 top-0";
      heroDirection = "transform rotate-45 right-0 top-0";
      triangleMargins.marginTop = "-12px";
      triangleMargins.marginLeft = "12px";
      break;
    case -1:
      swordDirection = "transform rotate-45";
      heroDirection = "transform rotate-90";
      triangleMargins.marginTop = "-1px";
      triangleMargins.marginLeft = "8px";
      break;
    case -10:
      swordDirection = "transform rotate-90 left-0 bottom-0";
      heroDirection = "transform rotate-135";
      triangleMargins.marginTop = "12px";
      triangleMargins.marginLeft = "12px";
      break;
    case -9:
      swordDirection = "transform rotate-135";
      heroDirection = "transform rotate-180";
      triangleMargins.marginTop = "8px";
      triangleMargins.marginLeft = "1px";
      break;
    case -8:
      swordDirection = "transform rotate-180 right-0 bottom-0";
      heroDirection = "transform rotate-225";
      triangleMargins.marginTop = "12px";
      triangleMargins.marginLeft = "-12px";
      break;
    case 1:
      swordDirection = "transform rotate-225";
      heroDirection = "transform -rotate-90";
      triangleMargins.marginTop = "-1px";
      triangleMargins.marginLeft = "-8px";
      break;
    case 10:
      swordDirection = "transform -rotate-90 right-0 top-0";
      heroDirection = "transform -rotate-45";
      triangleMargins.marginTop = "-17px";
      triangleMargins.marginLeft = "-17px";
      break;
  }

  let enemySVGvar = "hidden";

  switch (enemiesDirections[enemies.indexOf(arrIndex)]) {
    case 9:
      enemySVGvar = "";
      break;
    case 8:
      enemySVGvar = "transform rotate-45";
      break;
    case -1:
      enemySVGvar = "transform rotate-90";
      break;
    case -10:
      enemySVGvar = "transform rotate-135";
      break;
    case -9:
      enemySVGvar = "transform rotate-180";
      break;
    case -8:
      enemySVGvar = "transform rotate-225";
      break;
    case 1:
      enemySVGvar = "transform -rotate-90";
      break;
    case 10:
      enemySVGvar = "transform -rotate-45 ";
      break;
  }

  let enemyPulsing = "";

  let heroRelativePostion = arrIndex - hero.heroPosition;

  if (adjacentTilesRelativePositions.indexOf(heroRelativePostion) > -1) {
    enemyPulsing = "animate-pulse";
  }

  const [entityCSS, setHeroCSS] = useState("hidden");
  const [enemySVG, setEnemySVG] = useState("hidden");
  const [deathSVG, setDeathSVG] = useState("hidden");
  const [swordVisibility, setSwordVisibility] = useState("hidden");

  useEffect(() => {
    // death
    if (hero.heroPosition === arrIndex && !hero.alive) {
      setDeathSVG("h-6");
      settingStateToHidden([setSwordVisibility, setEnemySVG, setHeroCSS]);
      return;
    }
    // hero
    if (hero.heroPosition === arrIndex && hero.alive) {
      setHeroCSS(`w-3 h-3 bg-yellow-500 rounded-full z-40`);
      settingStateToHidden([setSwordVisibility, setEnemySVG, setDeathSVG]);
      return;
    }

    // sword (no color or red (after kill))
    if (hero.swordPosition === arrIndex && hero.alive) {
      // sword is red if enemy was just killed
      setSwordVisibility(
        `visible ${swordDirection} ${swordSize} ${
          lastEnemyKilled === arrIndex ? "fill-current text-red-600" : ""
        }`
      );
      settingStateToHidden([setEnemySVG, setHeroCSS, setDeathSVG]);
      return;
    }

    // enemies coloring - newly arrived enemy color for 1 turn(brownish)) or default (red)
    if (enemies.indexOf(arrIndex) > -1) {
      if (
        arrIndex === enemies[enemies.length - 1] &&
        currentTurn % 2 === 0 &&
        currentTurn !== 1 &&
        currentTurn !== 0
      ) {
        setEnemySVG(`${enemySVGvar} fill-current text-red-900 h-6`);
      } else {
        setEnemySVG(`${enemySVGvar} fill-current text-red-600 h-6`);
      }

      settingStateToHidden([setSwordVisibility, setDeathSVG, setHeroCSS]);
      return;
    }
    // clearing if nothing should be rendered on the Tile
    settingStateToHidden([
      setSwordVisibility,
      setEnemySVG,
      setHeroCSS,
      setDeathSVG,
    ]);

    function settingStateToHidden(
      arr: React.Dispatch<React.SetStateAction<string>>[]
    ) {
      for (let el of arr) {
        el("hidden");
      }
    }
  }, [
    hero,
    arrIndex,
    enemies,
    swordDirection,
    currentTurn,
    enemySVGvar,
    lastEnemyKilled,
  ]);

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 ${backgroundColor} relative`}
    >
      {/* {boardTile[0]} */}
      {/* {boardTile[1]} */}
      {/* {arrIndex} */}

      <SwordSVG className={`${swordVisibility} ${swordDirection} absolute`} />

      <BugSVG className={`${enemySVG} ${enemyPulsing}`} />
      <DeathSVG className={`${deathSVG}`} />
      {/* rendering hero */}

      {arrIndex === hero.heroPosition && hero.alive ? (
        <div style={triangleMargins}>
          {/* <div className={`${entityCSS}`} style={{position: "absolute"}}></div> */}
          <div
            className={`${heroDirection} relative`}
            style={{ ...triangleBody }}
          >
            <div className="absolute" style={heroHands}>
              {/* <div className="absolute" style={lineBetween}></div> */}
            </div>
            <div
              className={`${entityCSS}`}
              style={{ position: "absolute", top: "10px", left: "-3px" }}
            >
              <div style={halfACircle}></div>
            </div>
          </div>
        </div>
      ) : null}

      
    </div>
  );
}

export default Tile;
