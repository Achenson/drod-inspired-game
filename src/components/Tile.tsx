import React from "react";
import { useState, useEffect } from "react";

import { HeroObj } from "../utils/interfaces";

import { ReactComponent as SwordSVG } from "../svgs/sword.svg";
import { ReactComponent as BugSVG } from "../svgs/malware-virus.svg";
import { ReactComponent as DeathSVG } from "../svgs/skull.svg";
import Hero from "./Hero";

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

  let bodyMargins = { marginTop: "auto", marginLeft: "auto" };

  switch (relativePosition) {
    case 9:
      swordDirection = "transform -rotate-45";
      heroDirection = "";
      bodyMargins.marginTop = "-26px";
      bodyMargins.marginLeft = "0px";
      // setMarginForBody({...marginForBody, marginTop: "-8px"});
      break;
    case 8:
      swordDirection = "left-0 top-0";
      heroDirection = "transform rotate-45 right-0 top-0";
      bodyMargins.marginTop = "-30px";
      bodyMargins.marginLeft = "30px";
      break;
    case -1:
      swordDirection = "transform rotate-45";
      heroDirection = "transform rotate-90";
      bodyMargins.marginTop = "0px";
      bodyMargins.marginLeft = "26px";
      break;
    case -10:
      swordDirection = "transform rotate-90 left-0 bottom-0";
      heroDirection = "transform rotate-135";
      bodyMargins.marginTop = "30px";
      bodyMargins.marginLeft = "30px";
      break;
    case -9:
      swordDirection = "transform rotate-135";
      heroDirection = "transform rotate-180";
      bodyMargins.marginTop = "26px";
      bodyMargins.marginLeft = "0px";
      break;
    case -8:
      swordDirection = "transform rotate-180 right-0 bottom-0";
      heroDirection = "transform rotate-225";
      bodyMargins.marginTop = "30px";
      bodyMargins.marginLeft = "-30px";
      break;
    case 1:
      swordDirection = "transform rotate-225";
      heroDirection = "transform -rotate-90";
      bodyMargins.marginTop = "-0px";
      bodyMargins.marginLeft = "-26px";
      break;
    case 10:
      swordDirection = "transform -rotate-90 right-0 top-0";
      heroDirection = "transform -rotate-45";
      bodyMargins.marginTop = "-30px";
      bodyMargins.marginLeft = "-30px";
      break;
  }

  let enemySVGvar = "";

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

  const [heroVisibility, setHeroVisibility] = useState<boolean>(false);
  const [enemyVisibility, setEnemyVisibility] = useState<boolean>(false);
  const [enemyCSS, setEnemyCSS] = useState<string>("");
  const [deathVisibility, setDeathVisibility] = useState<boolean>(false);
  const [swordVisibility, setSwordVisibility] = useState<boolean>(false);

  function enemyColor() {
    if (
      arrIndex === enemies[enemies.length - 1] &&
      currentTurn % 2 === 0 &&
      currentTurn !== 1 &&
      currentTurn !== 0
    ) {
      return "text-red-900";
    }

    return "text-red-600";
  }

  useEffect(() => {
    // death
    if (hero.heroPosition === arrIndex && !hero.alive) {
      setDeathVisibility(true);
      settingStateToHidden([
        setSwordVisibility,
        setEnemyVisibility,
        setHeroVisibility,
      ]);
      return;
    }
    // hero
    if (hero.heroPosition === arrIndex && hero.alive) {
      setHeroVisibility(true);
      settingStateToHidden([
        setSwordVisibility,
        setEnemyVisibility,
        setDeathVisibility,
      ]);
      return;
    }

    // sword (no color or red (after kill))
    if (hero.swordPosition === arrIndex && hero.alive) {
      // sword is red if enemy was just killed
      setSwordVisibility(true);
      settingStateToHidden([
        setEnemyVisibility,
        setHeroVisibility,
        setDeathVisibility,
      ]);
      return;
    }

    // enemies coloring - newly arrived enemy color for 1 turn(brownish)) or default (red)
    if (enemies.indexOf(arrIndex) > -1) {
      setEnemyVisibility(true);

      settingStateToHidden([
        setSwordVisibility,
        setDeathVisibility,
        setHeroVisibility,
      ]);
      return;
    }
    // clearing if nothing should be rendered on the Tile
    settingStateToHidden([
      setSwordVisibility,
      setEnemyVisibility,
      setHeroVisibility,
      setDeathVisibility,
    ]);

    function settingStateToHidden(
      arr: React.Dispatch<React.SetStateAction<boolean>>[]
    ) {
      for (let el of arr) {
        el(false);
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
      className={`flex items-center justify-center w-8 h-8 ${backgroundColor} ${
        heroVisibility ? "z-50" : "z-0"
      } relative`}
    >
      {/* {boardTile[0]} */}
      {/* {boardTile[1]} */}
      {/* {arrIndex} */}

      {swordVisibility ? (
        <SwordSVG
          className={`${swordDirection} ${swordSize} absolute  ${
            lastEnemyKilled === arrIndex ? "fill-current text-red-600" : ""
          }`}
        />
      ) : null}

      {enemyVisibility ? (
        <BugSVG
          className={` ${enemyPulsing} ${enemySVGvar} fill-current ${enemyColor()} h-6`}
        />
      ) : null}

      {deathVisibility ? <DeathSVG className={`h-6`} /> : null}

      {heroVisibility ? (
        <Hero heroDirection={heroDirection} bodyMargins={bodyMargins} />
      ) : null}
    </div>
  );
}

export default Tile;
