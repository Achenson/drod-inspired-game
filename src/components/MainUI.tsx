import React from "react";
import Board from "./Board";

import { useState, useEffect } from "react";
import UpperLeftUI from "./UpperLeftUI";
import UpperMiddleUI from "./UpperMiddleUI";
import Help from "./Help";

import { HeroObj } from "../utils/interfaces";
import { Directions } from "../utils/interfaces";

import makeBoard from "../utils/makeBoard";
import turnCourse from "../utils/turnCourse";
import handleKeysOrBtns from "../utils/handleKeysOrBtns";
import makeTopScore from "../utils/makeTopScore";

import useNumberStorage from "../hooks/useNumberStorage";

import RightBtnArea from "./RightBtnArea";
import LeftBtnArea from "./LeftBtnArea";
import UpperRightUI from "./UpperRightUI";
import UpperRightSettings from "./UpperRightSettings";
import NewGameBtn from "./NewGameBtn";
import TopDisplay from "./TopDisplay";

interface Props {}

function MainUI({}: Props): JSX.Element {
  const [isAudioOn, setIsAudioOn] = useNumberStorage("isAudioOn", 1);

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

  const [currentTurn, setCurrentTurn] = useState<number>(0);

  const [topScore, setTopScore] = useNumberStorage("score", 0);
  const [helpClicked, setHelpClicked] = useNumberStorage("helpClicked", 0);

  const enemiesInitial = [4];
  // enemies directions
  const directionsInitial = [-9];
  const heroInitial: HeroObj = {
    heroPosition: 40,
    alive: true,
    swordPosition: 31,
  };

  const [enemies, setEnemies] = useState<Array<number>>([...enemiesInitial]);
  // for remembering new enemy arrival when going back one turn
  const [randomNewEnemyPosition, setRandomNewEnemyPosition] = useState<
    [boolean, number]
  >([false, -1]);

  const [enemiesDirections, setEnemiesDirections] = useState<Array<number>>([
    ...directionsInitial,
  ]);

  // for remembering enemiesDirections when going back one turn
  const [savedEnemiesDirections, setSavedEnemiesDirections] = useState<
    [boolean, number[]]
  >([false, [-1]]);

  const [lastEnemyKilled, setLastEnemyKilled] = useState<number | null>(null);

  const [hero, setHero] = useState<HeroObj>({
    ...heroInitial,
  });

  const [oneTurnBack, setOneTurnBack] = useState({
    currentTurn: currentTurn,
    enemies: [...enemies],
    enemiesDirections: [...enemiesDirections],
    lastEnemyKilled: lastEnemyKilled,
    heroPosition: hero.heroPosition,
    alive: hero.alive,
    swordPosition: hero.swordPosition,
  });

  const [textOnDisplay, setTextOnDisplay] = useState<string>(
    "Deadly Tomb of Death - v1.0"
  );

  const [settingsVisibility, setSettingsVisibility] = useState<boolean>(false);
  const [helpVisibility, setHelpVisibility] = useState<boolean>(false);

  const mediaBreakpoint = 768;
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );

  const [largeScreenRender, setLargeScreenRender] = useState<boolean>(false);

  const [controlsVisibility, setControlsVisibility] = useNumberStorage(
    "controls",
    1
  );

  useEffect(() => {
    function handleResizeWindow() {
      setWindowWidth(window.innerWidth);
    }
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);

    if (windowWidth >= mediaBreakpoint) {
      setLargeScreenRender(true);
    } else {
      setLargeScreenRender(false);
    }

    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [windowWidth]);

  let oTB = oneTurnBack;

  function handleKeyDown(event: KeyboardEvent) {
    handleKeysOrBtnsWrapper(event.code);
  }

  function handleKeysOrBtnsWrapper(command: string) {
    handleKeysOrBtns(
      command,
      settingsVisibility,
      setSettingsVisibility,
      helpVisibility,
      setHelpVisibility,
      largeScreenRender,
      setTextOnDisplay,
      setCurrentTurn,
      setEnemies,
      setEnemiesDirections,
      setLastEnemyKilled,
      // one turn back
      oTB,
      setHero,
      randomNewEnemyPosition,
      setRandomNewEnemyPosition,
      savedEnemiesDirections,
      setSavedEnemiesDirections,
      turnCourseWrapper,
      newGame
    );
  }

  function turnCourseWrapper(directionToMove: Directions) {
    turnCourse(
      // from argument
      directionToMove,
      // from component
      setHero,
      setEnemies,
      currentTurn,
      setCurrentTurn,
      hero,
      enemies,
      adjacentTilesRelativePositions,
      boardSize,
      lastEnemyKilled,
      setLastEnemyKilled,
      enemiesDirections,
      isAudioOn,
      setOneTurnBack,
      setTextOnDisplay,
      topScore,
      setTopScore,
      randomNewEnemyPosition,
      setRandomNewEnemyPosition,
      setEnemiesDirections,
      savedEnemiesDirections,
      setSavedEnemiesDirections
    );
  }

  function newGame() {
    makeTopScore(
      currentTurn,
      topScore,
      setTopScore,
      setTextOnDisplay,
      isAudioOn,
      "new game"
    );

    if (settingsVisibility) {
      setSettingsVisibility(false);
    }

    setCurrentTurn(0);
    setEnemies([...enemiesInitial]);
    setEnemiesDirections([...directionsInitial]);
    setLastEnemyKilled(null);
    setHero({ ...heroInitial });
    setOneTurnBack({
      currentTurn: 0,
      enemies: [...enemiesInitial],
      enemiesDirections: [...directionsInitial],
      lastEnemyKilled: null,
      ...heroInitial,
    });
  }

  // useEffect(() => {
  //   // console.log(randomNewEnemyPosition[0]);

  //   console.log(enemies);
  // }, [enemies]);

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col justify-center relative"
        style={{ height: "100vh" }}
      >
        <TopDisplay
          boardWidth={boardWidth}
          textOnDisplay={textOnDisplay}
          largeScreenRender={largeScreenRender}
          controlsVisibility={controlsVisibility}
        />

        <div className="flex justify-between relative">
          <UpperLeftUI
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

        {controlsVisibility ? (
          <div
            className="flex justify-between"
            style={{ width: `${boardWidth}` }}
          >
            <LeftBtnArea
              boardWidth={boardWidth}
              handleKeysOrBtnsWrapper={handleKeysOrBtnsWrapper}
              setTextOnDisplay={setTextOnDisplay}
            />
            <RightBtnArea
              boardWidth={boardWidth}
              handleKeysOrBtnsWrapper={handleKeysOrBtnsWrapper}
              setTextOnDisplay={setTextOnDisplay}
            />
          </div>
        ) : null}
      </div>

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
