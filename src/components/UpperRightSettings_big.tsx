import React from "react";

import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as DeleteTopScore } from "../svgs/deleteDanger.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

import { ReactComponent as Touch } from "../svgs/touch.svg";
import { ReactComponent as Keyboard } from "../svgs/keyboard.svg";
import { ReactComponent as Cursor } from "../svgs/cursor.svg";

import { PropsChildren } from "./UpperRightSettings";

function UpperRightSettings_big({
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
      className="w-full absolute right-0 border-2 border-black rounded-md bg-gray-200"
      // style={{ top: "15rem" }}
    >
      <div className="flex">
        <VolumeOFF
          className={`cursor-pointer h-6 ${soundHover} mb-2 ${isAudioOn ? "" : "bg-red-500"}`}
          onClick={() => {
            setIsAudioOn(b=> !b)
          }}
          onMouseEnter={() => {
            setSoundHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setSoundHover(null);
          }}
        />
        <p className="text-sm ml-2">Sound On/Off</p>
      </div>

      <div className="flex">
        <Cursor
          className={`cursor-pointer h-6 ${touchHover} ${
            touchClicked ? "bg-green-500" : ""
          } mb-2`}
          onMouseEnter={() => {
            setTouchHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setTouchHover(null);
          }}
          onClick={() => {
            if (keyboardClicked) {
              setKeyboardClicked(false);
            }
            setTouchClicked((b) => !b);
          }}
        />
        <p className="text-sm ml-2">Pointer mode (controls always on)</p>
      </div>

      <div className="flex">
        <Keyboard
          className={`cursor-pointer h-6 ${keyboardHover} ${
            keyboardClicked ? "bg-green-500" : ""
          } mb-2`}
          onMouseEnter={() => {
            setKeyboardHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setKeyboardHover(null);
          }}
          onClick={() => {
            if (touchClicked) {
              setTouchClicked(false);
            }
            setKeyboardClicked((b) => !b);
          }}
        />
        <p className="text-sm ml-2">Keyboard mode (controls always off)</p>
      </div>

      <div className={`flex ${deleteVisibility ? "visible" : "hidden"}`}>
        <DeleteTopScore
          className={`h-6 cursor-pointer  ${deleteHover}`}
          onClick={toggleIcons}
          onMouseEnter={() => {
            setDeleteHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setDeleteHover(null);
          }}
        />

        <p className="text-sm ml-2">Delete top score</p>
      </div>

      <div
        className={`flex flex-row ${cancelVisibility ? "visible" : "hidden"} `}
      >
        <Confirm
          className={`h-6 cursor-pointer ${confirmHover}`}
          onClick={() => {
            (setTopScore as React.Dispatch<React.SetStateAction<string>>)("0")
            toggleIcons()
          }}
          onMouseEnter={() => {
            setConfirmHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setConfirmHover(null);
          }}
        />

        <Cancel
          className={`h-6 cursor-pointer ${cancelHover} ml-2
        `}
          onClick={toggleIcons}
          onMouseEnter={() => {
            setCancelHover("animate-pulse");
          }}
          onMouseLeave={() => {
            setCancelHover(null);
          }}
        />

        <p className="text-sm ml-2">Confirm/cancel</p>
      </div>
      {/* <Confirm className="h-6" /> */}
    </div>
  );
}

export default UpperRightSettings_big;
