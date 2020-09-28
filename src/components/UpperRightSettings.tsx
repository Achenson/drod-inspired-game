import React, { useEffect, useState } from "react";

import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as DeleteTopScore } from "../svgs/deleteDanger.svg";
import { ReactComponent as Desktop } from "../svgs/desktop.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

import { ReactComponent as Touch } from "../svgs/touch.svg";
import { ReactComponent as Keyboard } from "../svgs/keyboard.svg";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  
  
}

function UpperRightSettings({
  setTextOnDisplay,
  
}: Props): JSX.Element {
  // const [volumeColor, setVolumeColor] = useState("text-black")

  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(true);
  const [cancelVisibility, setCancelVisibility] = useState<boolean>(false);

  const [touchHover, setTouchHover] = useState<"animate-pulse" | null>(null);

  const [touchClicked, setTouchClicked] = useState<boolean>(false);

  const [keyboardHover, setKeyboardHover] = useState<"animate-pulse" | null>(
    null
  );

  const [keyboardClicked, setKeyboardClicked] = useState<boolean>(false);



  const [soundHover, setSoundHover] = useState<"animate-pulse" | null>(null);
  const [deleteHover, setDeleteHover] = useState<"animate-pulse" | null>(null);
  const [confirmHover, setConfirmHover] = useState<"animate-pulse" | null>(
    null
  );
  const [cancelHover, setCancelHover] = useState<"animate-pulse" | null>(null);


  function toggleIcons() {
    setConfirmVisibility(!confirmVisibility);
    setDeleteVisibility(!deleteVisibility);
    setCancelVisibility(!cancelVisibility);
  }

  return (
    <div
      className="flex mt-1 absolute right-0 border-2 border-black rounded-md bg-gray-200"
      style={{ top: "3rem" }}
    >
      <VolumeOFF
        className={`cursor-pointer h-6 ${soundHover}`}
        onMouseEnter={() => {
          setTextOnDisplay("Sound On/Off");
          setSoundHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setSoundHover(null);
        }}
      />
      {/* <VolumeON className="h-6"/> */}
      {/* <Desktop
        className={`cursor-pointer h-6 ${
          desktopColorDefault ? "" : "bg-green-500"
        } ${desktopHover}`}
        onMouseEnter={() => {
          setTextOnDisplay(`Large screen mode On/Off`);
          setDesktopHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setDesktopHover(null);
        }}
        onClick={() => {
          setLargeScreenRender(b =>!b)
        }}
      /> */}

      <Touch
        className={`cursor-pointer h-6 ${touchHover} ${
          touchClicked ? "bg-green-500" : ""
        }`}
        onMouseEnter={() => {
          setTextOnDisplay(`Touch mode responsive/always on`);
          setTouchHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setTouchHover(null);
        }}
        onClick={() => {
          setTouchClicked((b) => !b);
          if(keyboardClicked) {
            setKeyboardClicked(false)
          }
        }}
      />
      <Keyboard
        className={`cursor-pointer h-6 ${keyboardHover} ${
          keyboardClicked ? "bg-green-500" : ""
        }`}
        onMouseEnter={() => {
          setTextOnDisplay(`Keyboard mode responsive/always on`);
          setKeyboardHover("animate-pulse");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
          setKeyboardHover(null);
        }}
        onClick={() => {
          setKeyboardClicked((b) => !b);
          if(touchClicked) {
            setTouchClicked(false)
          }
        }}
      />

      <Confirm
        className={`h-6 cursor-pointer ${
          confirmVisibility ? "visible" : "invisible"
        } ${confirmHover}`}
        onClick={toggleIcons}
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

export default UpperRightSettings;
