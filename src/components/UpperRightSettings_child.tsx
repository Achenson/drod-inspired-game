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

function UpperRightSettings_child({
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
  setIsAudioOn,
  largeScreenRender,
}: PropsChildren): JSX.Element {



  return (
    <div
      className={`w-full absolute right-0 border-2 border-black rounded-md bg-gray-200 z-50 ${largeScreenRender ? "flex justify-end" : ""} `}
      style={{ width: `${largeScreenRender ? "124px": "100%"}` }}
    >
      <div className="flex">
        <VolumeOFF
          className={`cursor-pointer h-6 ${soundHover} ${
            isAudioOn ? "" : "bg-red-500"
          } mb-2 md:mb-0`}
          onClick={() => {
            setIsAudioOn((b) => !b);
          }}
          onMouseEnter={() => {
            setSoundHover("animate-pulse");
            if (largeScreenRender) {
              setTextOnDisplay("Sound On/Off");
            }
          }}
          onMouseLeave={() => {
            setSoundHover(null);
            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
        />
        {largeScreenRender ? null : (
          <p className="text-sm ml-2">Sound On/Off</p>
        )}
      </div>

      <div className="flex">
        <Cursor
          className={`cursor-pointer h-6 ${touchHover} ${
            touchClicked ? "bg-green-500" : ""
          } mb-2 md:mb-0`}
          onMouseEnter={() => {
            setTouchHover("animate-pulse");
            if (largeScreenRender) {
              setTextOnDisplay("Pointer mode (controls always on)");
            }
          }}
          onMouseLeave={() => {
            setTouchHover(null);
            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
          onClick={() => {
            if (keyboardClicked) {
              setKeyboardClicked(false);
            }
            setTouchClicked((b) => !b);
          }}
        />
        {largeScreenRender ? null : (
          <p className="text-sm ml-2">Pointer mode (controls always on)</p>
        )}
      </div>

      <div className="flex">
        <Keyboard
          className={`cursor-pointer h-6 ${keyboardHover} ${
            keyboardClicked ? "bg-green-500" : ""
          } mb-2 md:mb-0`}
          onMouseEnter={() => {
            setKeyboardHover("animate-pulse");
            if (largeScreenRender) {
              setTextOnDisplay("Keyboard mode (controls always off)");
            }
          }}
          onMouseLeave={() => {
            setKeyboardHover(null);

            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
          onClick={() => {
            if (touchClicked) {
              setTouchClicked(false);
            }
            setKeyboardClicked((b) => !b);
          }}
        />
        {largeScreenRender ? null : (
          <p className="text-sm ml-2">Keyboard mode (controls always off)</p>
        )}
      </div>

      <div className={`flex ${deleteVisibility ? "visible" : "hidden"}`}>
        <DeleteTopScore
          className={`h-6 cursor-pointer  ${deleteHover} md:ml-6`}
          onClick={toggleIcons}
          onMouseEnter={() => {
            setDeleteHover("animate-pulse");

            if (largeScreenRender) {
              setTextOnDisplay("Delete top score");
            }
          }}
          onMouseLeave={() => {
            setDeleteHover(null);

            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
        />

        {largeScreenRender ? null : (
          <p className="text-sm ml-2">Delete top score</p>
        )}
      </div>

      <div
        className={`flex flex-row ${cancelVisibility ? "visible" : "hidden"} `}
      >
        <Confirm
          className={`h-6 cursor-pointer ${confirmHover}`}
          onClick={() => {
            (setTopScore as React.Dispatch<React.SetStateAction<number>>)(0);
            toggleIcons();
          }}
          onMouseEnter={() => {
            setConfirmHover("animate-pulse");
            if (largeScreenRender) {
              setTextOnDisplay("Confirm top score deletion");
            }
          }}
          onMouseLeave={() => {
            setConfirmHover(null);
            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
        />

        <Cancel
          className={`h-6 cursor-pointer ${cancelHover} ml-2 md:ml-0
        `}
          onClick={toggleIcons}
          onMouseEnter={() => {
            setCancelHover("animate-pulse");

            if (largeScreenRender) {
              setTextOnDisplay("Cancel");
            }
          }}
          onMouseLeave={() => {
            setCancelHover(null);

            if (largeScreenRender) {
              setTextOnDisplay("");
            }
          }}
        />

        {largeScreenRender ? null : (
          <p className="text-sm ml-2">Confirm/cancel</p>
        )}
      </div>
      {/* <Confirm className="h-6" /> */}
    </div>
  );
}

export default UpperRightSettings_child;
