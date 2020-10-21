import React, { useMemo } from "react";
import { useState, useEffect } from "react";

import { HeroObj } from "../utils/interfaces";

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
  boardSize: number;
}

function Tile({
  boardTile,
  arrIndex,
  hero,
  enemies,
  currentTurn,
  lastEnemyKilled,
  enemiesDirections,
  boardSize,
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

  const swordSize = "w-6 h-10";

  //                                      nw  n ne   e   se   s  sw  w
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

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
  let hRP = heroRelativePostion;

  if (
    adjacentTilesRelativePositions.indexOf(heroRelativePostion) > -1 &&
    hero.alive
  ) {
    if (
      !(
        (arrIndex % boardSize === 0 &&
          // nw                     w            sw
          (hRP === 10 || hRP === 1 || hRP === -8)) ||
        // (enemy % (boardSize - 1) === 0 &&
        ((arrIndex + 1) % boardSize === 0 &&
          // ne                     e            se
          (hRP === 8 || hRP === -1 || hRP === -10))
      )
    ) {
      enemyPulsing = "animate-pulse";
    }
  }

  const [heroVisibility, setHeroVisibility] = useState<boolean>(false);
  const [enemyVisibility, setEnemyVisibility] = useState<boolean>(false);
  const [deathVisibility, setDeathVisibility] = useState<boolean>(false);

  

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
      settingStateToHidden([setEnemyVisibility, setHeroVisibility]);
      return;
    }
    // hero
    if (hero.heroPosition === arrIndex && hero.alive) {
      setHeroVisibility(true);
      settingStateToHidden([setEnemyVisibility, setDeathVisibility]);
      return;
    }

    // enemies coloring - newly arrived enemy color for 1 turn(brownish)) or default (red)
    if (enemies.indexOf(arrIndex) > -1) {
      setEnemyVisibility(true);

      settingStateToHidden([setDeathVisibility, setHeroVisibility]);
      return;
    }
    // clearing if nothing should be rendered on the Tile
    settingStateToHidden([
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
  }, [hero, arrIndex, enemies]);

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 ${backgroundColor} ${
        heroVisibility ? "z-50" : "z-0"
      } relative`}
    >
      {/* {boardTile[0]} */}
      {/* {boardTile[1]} */}
      {/* {arrIndex} */}

      {enemyVisibility ? (
        <BugSVG
          className={` ${enemyPulsing} ${enemySVGvar} fill-current ${enemyColor()} h-6`}
        />
      ) : null}

      {deathVisibility ? <DeathSVG className={`h-6`} /> : null}

      {heroVisibility ? (
        <Hero
          lastEnemyKilled={lastEnemyKilled}
          arrIndex={arrIndex}
          swordSize={swordSize}
          hero={hero}
        />
      ) : null}
    </div>
  );
}

export default Tile;
