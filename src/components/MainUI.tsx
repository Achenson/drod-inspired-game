import React, { ReactElement, ReactEventHandler, createElement } from "react";
import Board from "./Board";

import { useState, useEffect } from "react";
import UpperLeftUI from "./UpperLeftUI";
import UpperMiddleUI from "./UpperMiddleUI";

import { HeroObj } from "../utils/interfaces";
import { Directions } from "../utils/interfaces";

import makeBoard from "../utils/makeBoard";
import moveHero from "../utils/moveHero";

import useStorage from "../hooks/useStorage";

// import { ReactComponent as Medal } from "../svgs/medal.svg";
import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as Delete } from "../svgs/deleteDanger.svg";
import { ReactComponent as Desktop } from "../svgs/desktop.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

import RightBtnArea from "./RightBtnArea";
import LeftBtnArea from "./LeftBtnArea";
import UpperRightUI from "./UpperRightUI";
import UpperRightSettings from "./UpperRightSettings";
import NewGameBtn from "./NewGameBtn";
import TopDisplay from "./TopDisplay";

interface Props {}

function MainUI({}: Props): JSX.Element {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // !!!! without this everything will be recalculated from start - lag
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const boardSize = 9;
  const boardWidth = boardSize * 32;
  // starts with sword NW of hero         nw
  const adjacentTilesRelativePositions = [10, 9, 8, -1, -10, -9, -8, 1];

  let board = makeBoard(boardSize);

  // const [turnsPassed, setTurnsPassed] = useState()

  const [currentTurn, setCurrentTurn] = useState<number>(0);

  // const [topScore, setTopScore] = useState<string>("248");
  const [topScore, setTopScore] = useStorage("score", "0");
  const [helpClicked, setHelpClicked] = useStorage("helpClicked", "false");

  // useEffect(() => {
  //   let topScoreSaved = localStorage.getItem("score");

  //   if (topScoreSaved) {
  //     setTopScore(topScoreSaved);
  //   } else {
  //     localStorage.setItem("score", "0");
  //   }
  // }, []);

  const enemiesInitial = [4];
  const directionsInitial = [-9];
  const heroInitial: HeroObj = {
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  };

  const [enemiesKilled, setEnemiesKilled] = useState<number>(0);
  // const [enemies, setEnemies] = useState<Array<number | null>>([4]);
  const [enemies, setEnemies] = useState<Array<number>>([...enemiesInitial]);

  const [enemiesDirections, setEnemiesDirections] = useState<Array<number>>([
    ...directionsInitial,
  ]);

  const [lastEnemyKilled, setLastEnemyKilled] = useState<number | null>(null);

  const [hero, setHero] = useState<HeroObj>({
    ...heroInitial,
  });

  const [oneTurnBack, setOneTurnBack] = useState({
    currentTurn: currentTurn,
    // record score is can't be restored
    // topScore: topScore,
    enemiesKilled: enemiesKilled,
    enemies: [...enemies],
    enemiesDirections: [...enemiesDirections],
    lastEnemyKilled: lastEnemyKilled,
    heroPosition: hero.heroPosition,
    alive: hero.alive,
    swordPosition: hero.swordPosition,
  });

  const [textOnDisplay, setTextOnDisplay] = useState<string>("sampleText");

  let oTB = oneTurnBack;

  function handleKeyDown(event: KeyboardEvent) {
    handleKeysOrBtns(event.code);
  }

  function handleKeysOrBtns(command: string) {
    switch (command) {
      // rewind one round back
      case "KeyR":
        console.log("KeyR");
        setTextOnDisplay("");
        setCurrentTurn(oTB.currentTurn);
        setEnemiesKilled(oTB.enemiesKilled);
        setEnemies([...oTB.enemies]);
        setEnemiesDirections([...oTB.enemiesDirections]);
        setLastEnemyKilled(oTB.lastEnemyKilled);
        setHero({
          heroPosition: oTB.heroPosition,
          alive: oTB.alive,
          swordPosition: oTB.swordPosition,
        });
        break;
      case "KeyQ":
        console.log("q");
        heroMovement(Directions.anticlockwise);
        break;
      case "KeyW":
        console.log("w");
        heroMovement(Directions.clockwise);
        break;
      case "Numpad7":
        console.log("numpad 7");
        heroMovement(Directions.nw);
        break;
      case "Numpad8":
        console.log("numpad 8");
        heroMovement(Directions.n);
        break;
      case "Numpad9":
        console.log("numpad 9");
        heroMovement(Directions.ne);
        break;
      case "Numpad4":
        console.log("numpad 4");
        heroMovement(Directions.w);
        break;
      case "Numpad5":
        console.log("numpad 5");
        heroMovement(Directions.wait);
        break;
      case "Numpad6":
        console.log("numpad 6");
        heroMovement(Directions.e);
        break;
      case "Numpad1":
        console.log("numpad 1");
        heroMovement(Directions.sw);
        break;
      case "Numpad2":
        console.log("numpad 2");
        heroMovement(Directions.s);
        break;
      case "Numpad3":
        console.log("numpad 3");
        heroMovement(Directions.se);
        break;
      case "KeyN":
        console.log("New Game");
        newGame();
        break;
    }
  }

  function heroMovement(directionToMove: Directions) {
    if (!hero.alive) {
      return;
    }

    if (currentTurn !== 0) {
      setOneTurnBack({
        currentTurn: currentTurn,
        // topScore: topScore,
        enemiesKilled: enemiesKilled,
        enemies: [...enemies],
        enemiesDirections: [...enemiesDirections],
        lastEnemyKilled: lastEnemyKilled,
        heroPosition: hero.heroPosition,
        alive: hero.alive,
        swordPosition: hero.swordPosition,
      });
    }

    moveHero(
      directionToMove,
      setHero,
      setEnemies,
      setEnemiesKilled,
      currentTurn,
      setCurrentTurn,
      hero,
      enemies,
      adjacentTilesRelativePositions,
      boardSize,
      setLastEnemyKilled,
      topScore,
      setTopScore,
      enemiesDirections,
      setEnemiesDirections,
      setTextOnDisplay
    );
  }

  function newGame() {
    setTextOnDisplay("");
    setCurrentTurn(0);
    setEnemiesKilled(0);
    setEnemies([...enemiesInitial]);
    setEnemiesDirections([...directionsInitial]);
    setLastEnemyKilled(null);
    setHero({ ...heroInitial });
    setOneTurnBack({
      currentTurn: 0,
      // record score is can't be restored
      // topScore: topScore,
      enemiesKilled: 0,
      enemies: [...enemiesInitial],
      enemiesDirections: [...directionsInitial],
      lastEnemyKilled: null,
      ...heroInitial,
    });
  }

  return (
    <div className="flex justify-center">
      {/* <div className="flex items-center bg-indigo-200" style={{height: "100vh"}}> */}
      <div className="flex flex-col justify-center" style={{ height: "100vh" }}>
        <TopDisplay boardWidth={boardWidth} textOnDisplay={textOnDisplay} />

        <div className="flex justify-between relative">
          <UpperLeftUI
            enemiesKilled={enemiesKilled}
            topScore={topScore}
            enemies={enemies}
            setTextOnDisplay={setTextOnDisplay}
          />
          <UpperMiddleUI
            currentTurn={currentTurn}
            setTextOnDisplay={setTextOnDisplay}
          />
        <UpperRightSettings />
          <UpperRightUI
            setTextOnDisplay={setTextOnDisplay}
            helpClicked={helpClicked}
            setHelpClicked={setHelpClicked}
          />
        </div>

        <Board
          board={board}
          boardSize={boardSize}
          boardWidth={boardWidth}
          hero={hero}
          enemies={enemies}
          currentTurn={currentTurn}
          lastEnemyKilled={lastEnemyKilled}
          enemiesDirections={enemiesDirections}
        />
        <NewGameBtn newGame={newGame} setTextOnDisplay={setTextOnDisplay} />
        <div
          className="flex justify-between"
          style={{ width: `${boardWidth}` }}
        >
          <LeftBtnArea
            boardWidth={boardWidth}
            handleKeysOrBtns={handleKeysOrBtns}
            setTextOnDisplay={setTextOnDisplay}
          />

          <RightBtnArea
            boardWidth={boardWidth}
            handleKeysOrBtns={handleKeysOrBtns}
            setTextOnDisplay={setTextOnDisplay}
          />
        </div>

        {/* <ArrowUp className="h-6"/>
      <Rewind className="h-4"/>
      <TurnAnticlockwise className="h-6"/>
      <TurnClockwise className="h-6" style={{transform: "scaleX(-1)"}}/>
      <Wait className="h-8"/>
      <Settings className="h-8"/> */}
        {/* <Help2 className="h-8"/> */}
        {/* <Help className="h-6"/>
      <Medal className="h-8 fill-current" style={{color: "gold"}}/>
      <Medal className="h-8 fill-current text-gray-500" />
      <Medal className="h-8 fill-current text-yellow-800"/> */}
      </div>
      <VolumeOFF className="h-6" />
      <VolumeON className="h-6" />
      <Delete className="h-6" />
      <Desktop className="h-6" />
      <Cancel className="h-6" />
      <Confirm className="h-6" />
    </div>
  );
}

export default MainUI;
