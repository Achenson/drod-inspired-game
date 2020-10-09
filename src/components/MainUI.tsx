import React, { ReactElement, ReactEventHandler, createElement } from "react";
import Board from "./Board";

import { useState, useEffect } from "react";
import UpperLeftUI from "./UpperLeftUI";
import UpperMiddleUI from "./UpperMiddleUI";
import Help from "./Help";

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
import { ReactComponent as Touch } from "../svgs/touch.svg";
import { ReactComponent as Keyboard } from "../svgs/keyboard.svg";

import RightBtnArea from "./RightBtnArea";
import LeftBtnArea from "./LeftBtnArea";
import UpperRightUI from "./UpperRightUI";
import UpperRightSettings from "./UpperRightSettings";
import NewGameBtn from "./NewGameBtn";
import TopDisplay from "./TopDisplay";

// using import for mp3 not working in typescript??!

const topScore_audio = require("../mp3/award_nylon_plucked.mp3");
const medal_audio = require("../mp3/retro_fanfare.mp3");
const death_audio = require("../mp3/bite_munch.mp3");
const enemyKilled_audio = require("../mp3/impact_sword_hit.mp3");
const forbiddenMove_audio = require("../mp3/game_error.mp3");
const swing_audio = require("../mp3/sabre_swing.mp3");
const movement_audio = require("../mp3/single_step_heavy.mp3");
const waiting_audio = require("../mp3/snore_single.mp3");



const topScore_mp3 = new Audio(topScore_audio);
const medal_mp3 = new Audio(medal_audio);
const death_mp3 = new Audio(death_audio);
const enemyKilled_mp3 = new Audio(enemyKilled_audio);
const forbiddenMove_mp3 = new Audio(forbiddenMove_audio);
const swing_mp3 = new Audio(swing_audio);
const movement_mp3 = new Audio(movement_audio);
const waiting_mp3 = new Audio(waiting_audio);

interface Props {}

function MainUI({}: Props): JSX.Element {
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

  function playAudio(audioVar: HTMLAudioElement, isAudioOn: boolean) {
    if (isAudioOn) {
      audioVar.play();
    }
  }

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

  // const [enemiesKilled, setEnemiesKilled] = useState<number>(0);
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
    // enemiesKilled: enemiesKilled,
    enemies: [...enemies],
    enemiesDirections: [...enemiesDirections],
    lastEnemyKilled: lastEnemyKilled,
    heroPosition: hero.heroPosition,
    alive: hero.alive,
    swordPosition: hero.swordPosition,
  });

  const [textOnDisplay, setTextOnDisplay] = useState<string>("sampleText");

  const [settingsVisibility, setSettingsVisibility] = useState<boolean>(false);
  const [helpVisibility, setHelpVisibility] = useState<boolean>(false);

  // let mql = window.matchMedia('(min-width: 600px)');

  const mediaBreakpoint = 768;
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const [largeScreenRender, setLargeScreenRender] = useState<boolean>(false);

  const [controlsVisibility, setControlsVisibility] = useState<
    "responsive" | "alwaysOn" | "alwaysOff"
  >("responsive");

  const [controlsRender, setControlsRender] = useState<boolean>(true);

  useEffect(() => {
    function handleResizeWindow() {
      setWindowWidth(window.innerWidth);
    }
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);

    if (windowWidth > mediaBreakpoint) {
      setLargeScreenRender(true);
    } else {
      setLargeScreenRender(false);
    }

    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (controlsVisibility === "responsive") {
      largeScreenRender ? setControlsRender(false) : setControlsRender(true);
    }

    if (controlsVisibility === "alwaysOn") {
      // console.log("Onnnnn");

      setControlsRender(true);
    }

    if (controlsVisibility === "alwaysOff") {
      // console.log("OFFFF");
      setControlsRender(false);
    }
  }, [controlsVisibility, largeScreenRender]);

  let oTB = oneTurnBack;

  function handleKeyDown(event: KeyboardEvent) {
    handleKeysOrBtns(event.code);
  }

  function handleKeysOrBtns(command: string) {
    if (settingsVisibility) {
      setSettingsVisibility(false);
    }

    if(helpVisibility && !largeScreenRender) {
      setHelpVisibility(false);
    }

    switch (command) {
      // rewind one round back
      case "KeyR":
        console.log("KeyR");
        setTextOnDisplay("");
        setCurrentTurn(oTB.currentTurn);
        // setEnemiesKilled(oTB.enemiesKilled);
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
        playAudio(topScore_mp3, isAudioOn);
        // topScore_mp3.play();

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

    setTextOnDisplay("");

    if (currentTurn !== 0) {
      setOneTurnBack({
        currentTurn: currentTurn,
        // topScore: topScore,
        // enemiesKilled: enemiesKilled,
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
      // setEnemiesKilled,
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
      setTextOnDisplay,
      playAudio,
      isAudioOn,
      topScore_mp3,
      medal_mp3,
      death_mp3,
      forbiddenMove_mp3,
      enemyKilled_mp3,
      swing_mp3,
      movement_mp3,
      waiting_mp3
    );
  }

  function newGame() {
    setTextOnDisplay("");

    if (settingsVisibility) {
      setSettingsVisibility(false);
    }

    setCurrentTurn(0);
    // setEnemiesKilled(0);
    setEnemies([...enemiesInitial]);
    setEnemiesDirections([...directionsInitial]);
    setLastEnemyKilled(null);
    setHero({ ...heroInitial });
    setOneTurnBack({
      currentTurn: 0,
      // record score is can't be restored
      // topScore: topScore,
      // enemiesKilled: 0,
      enemies: [...enemiesInitial],
      enemiesDirections: [...directionsInitial],
      lastEnemyKilled: null,
      ...heroInitial,
    });
  }

  return (
    <div className="flex justify-center">
      {/* <div className="flex items-center bg-indigo-200" style={{height: "100vh"}}> */}
      <div
        className="flex flex-col justify-center relative"
        style={{ height: "100vh" }}
      >
        <TopDisplay boardWidth={boardWidth} textOnDisplay={textOnDisplay} />

        <div className="flex justify-between relative">
          <UpperLeftUI
            // enemiesKilled={enemiesKilled}
            topScore={topScore}
            enemies={enemies}
            setTextOnDisplay={setTextOnDisplay}
          />
          <UpperMiddleUI
            currentTurn={currentTurn}
            setTextOnDisplay={setTextOnDisplay}
          />

          <UpperRightUI
            setTextOnDisplay={setTextOnDisplay}
            helpClicked={helpClicked}
            setHelpClicked={setHelpClicked}
            settingsVisibility={settingsVisibility}
            setSettingsVisibility={setSettingsVisibility}
            helpVisibility={helpVisibility}
            setHelpVisibility={setHelpVisibility}
            largeScreenRender={largeScreenRender}
          />
        </div>

        <div className="relative">
          {settingsVisibility ? (
            <UpperRightSettings
              setTextOnDisplay={setTextOnDisplay}
              largeScreenRender={largeScreenRender}
              controlsVisibility={controlsVisibility}
              setControlsVisibility={setControlsVisibility}
              setTopScore={setTopScore}
              isAudioOn={isAudioOn}
              setIsAudioOn={setIsAudioOn}
            />
          ) : null}

          {largeScreenRender ? null : (
            <Help
              boardWidth={boardWidth}
              largeScreenRender={largeScreenRender}
              helpVisibility={helpVisibility}
            />
          )}
          <Board
            board={board}
            boardSize={boardSize}
            boardWidth={boardWidth}
            hero={hero}
            enemies={enemies}
            currentTurn={currentTurn}
            lastEnemyKilled={lastEnemyKilled}
            enemiesDirections={enemiesDirections}
            settingsVisibility={settingsVisibility}
            setSettingsVisibility={setSettingsVisibility}
          />
        </div>

        <NewGameBtn newGame={newGame} setTextOnDisplay={setTextOnDisplay} />

        {controlsRender ? (
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
        ) : null}

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
      {/* <VolumeOFF className="h-6" />
      <VolumeON className="h-6" />
      <Delete className="h-6" />
      <Desktop className="h-6" />
      <Cancel className="h-6" />
      <Confirm className="h-6" /> */}
      {/* <Touch className="h-6"/>
      <Keyboard className="h-6"/> */}
      {largeScreenRender ? (
        <Help
          boardWidth={boardWidth}
          largeScreenRender={largeScreenRender}
          helpVisibility={helpVisibility}
        />
      ) : null}
    </div>
  );
}

export default MainUI;
