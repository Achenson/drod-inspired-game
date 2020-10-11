import React from "react";

import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as DeleteTopScore } from "../svgs/deleteDanger.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

import { ReactComponent as Touch } from "../svgs/touch.svg";
import { ReactComponent as Keyboard } from "../svgs/keyboard.svg";
import { ReactComponent as Cursor } from "../svgs/cursor.svg";

import {PropsChildren} from "./UpperRightSettings";



function UpperRightSettings_small({
  setTextOnDisplay,
  soundHover,
  setSoundHover,
  touchHover,
  setTouchHover,
  keyboardHover,
  setKeyboardHover,
  touchClicked,
  setTouchClicked,
  keyboardClicked,
  setKeyboardClicked,
  confirmVisibility,
  confirmHover,
  setConfirmHover,
  deleteVisibility,
  deleteHover,
  setDeleteHover,
  toggleIcons,
  cancelVisibility,
  cancelHover,
  setCancelHover,
  setTopScore,
  isAudioOn,
  setIsAudioOn


}: PropsChildren): JSX.Element {
  return (
    <div
      className="flex absolute right-0 border-2 border-black rounded-md bg-gray-200 z-50"
    
    >
      <VolumeOFF
        className={`cursor-pointer h-6 ${soundHover} ${isAudioOn ? "" : "bg-red-500"}`}
        onClick={() => {
          setIsAudioOn(b=> !b)
        }}
        onMouseEnter={() => {
          setTextOnDisplay("Sound On/Off");
          setSoundHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setSoundHover(null);
        }}
      />

      <Cursor
        className={`cursor-pointer h-6 ${touchHover} ${
          touchClicked ? "bg-green-500" : ""
        }`}
        onMouseEnter={() => {
          setTextOnDisplay(`Pointer mode (controls always on)`);
          setTouchHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setTouchHover(null);
        }}
        onClick={() => {
          if (keyboardClicked) {
            setKeyboardClicked(false);
          }
          setTouchClicked((b) => !b);
        }}
      />
      <Keyboard
        className={`cursor-pointer h-6 ${keyboardHover} ${
          keyboardClicked ? "bg-green-500" : ""
        }`}
        onMouseEnter={() => {
          setTextOnDisplay(`Keyboard mode (controls always off)`);
          setKeyboardHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setKeyboardHover(null);
        }}
        onClick={() => {
          if (touchClicked) {
            setTouchClicked(false);
          }
          setKeyboardClicked((b) => !b);
        }}
      />

      <Confirm
        className={`h-6 cursor-pointer ${
          confirmVisibility ? "visible" : "invisible"
        } ${confirmHover}`}
        onClick={() => {

          (setTopScore as React.Dispatch<React.SetStateAction<string>>)("0")
            toggleIcons()

        }}
        onMouseEnter={() => {
          setTextOnDisplay("Confirm top score deletion");
          setConfirmHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setConfirmHover(null);
        }}
      />
      <DeleteTopScore
        className={`h-6 cursor-pointer ${
          deleteVisibility ? "visible" : "hidden"
        } ${deleteHover}`}
        onClick={toggleIcons}
        onMouseEnter={() => {
          setTextOnDisplay("Delete top score");
          setDeleteHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setDeleteHover(null);
        }}
      />
      <Cancel
        className={`h-6 cursor-pointer ${
          cancelVisibility ? "visible" : "hidden"
        } ${cancelHover}
        `}
        onClick={toggleIcons}
        onMouseEnter={() => {
          setTextOnDisplay("Cancel");
          setCancelHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setCancelHover(null);
        }}
      />
      {/* <Confirm className="h-6" /> */}
    </div>
  );
}

export default UpperRightSettings_small;
