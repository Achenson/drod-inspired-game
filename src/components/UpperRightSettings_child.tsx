import React from "react";

import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as DeleteTopScore } from "../svgs/deleteDanger.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

import { ReactComponent as Touch } from "../svgs/touch.svg";
import { ReactComponent as Keyboard } from "../svgs/keyboard.svg";
import { ReactComponent as Cursor } from "../svgs/cursor.svg";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  soundHover: "animate-pulse" | null;
  setSoundHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;
  // touchHover: "animate-pulse" | null;
  // setTouchHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;
  keyboardHover: "animate-pulse" | null;
  setKeyboardHover: React.Dispatch<
    React.SetStateAction<"animate-pulse" | null>
  >;
  // touchClicked: boolean;
  // setTouchClicked: React.Dispatch<React.SetStateAction<boolean>>;
  keyboardClicked: boolean;
  setKeyboardClicked: React.Dispatch<React.SetStateAction<boolean>>;
  confirmHover: "animate-pulse" | null;
  setConfirmHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;
  deleteHover: "animate-pulse" | null;
  setDeleteHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;
  confirmVisibility: boolean;
  setConfirmVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  deleteVisibility: boolean;
  setDeleteVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIcons: () => void;
  cancelVisibility: boolean;
  setCancelVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  cancelHover: "animate-pulse" | null;
  setCancelHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>;
  isAudioOn: number | React.Dispatch<React.SetStateAction<number>>;
  setIsAudioOn: number | React.Dispatch<React.SetStateAction<number>>;
  largeScreenRender: boolean;
}

function UpperRightSettings_child({
  setTextOnDisplay,
  soundHover,
  setSoundHover,
  // touchHover,
  // setTouchHover,
  keyboardHover,
  setKeyboardHover,
  // touchClicked,
  // setTouchClicked,
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
}: Props): JSX.Element {
  return (
    <div
      className={`w-full absolute right-0 border-2 border-black rounded-md bg-gray-200 z-50 ${
        largeScreenRender ? "flex justify-end" : ""
      } `}
      style={{ width: `${largeScreenRender ? "100px" : "100%"}` }}
    >
      <div className="flex">
        <VolumeOFF
          className={`cursor-pointer h-6 ${soundHover} ${
            isAudioOn ? "" : "bg-red-500"
          } mb-2 md:mb-0`}
          onClick={() => {
            if (isAudioOn) {
              (setIsAudioOn as React.Dispatch<React.SetStateAction<number>>)(0);
            } else {
              (setIsAudioOn as React.Dispatch<React.SetStateAction<number>>)(1);
            }
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

      {/* <div className="flex">
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
      </div> */}

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
            // if (touchClicked) {
            //   setTouchClicked(false);
            // }
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
