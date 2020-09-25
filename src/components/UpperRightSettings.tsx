import React, { useEffect, useState } from "react";

import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as DeleteTopScore } from "../svgs/deleteDanger.svg";
import { ReactComponent as Desktop } from "../svgs/desktop.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  largeScreenRender: boolean;
}

function UpperRightSettings({ setTextOnDisplay, largeScreenRender}: Props): JSX.Element {
  // const [volumeColor, setVolumeColor] = useState("text-black")

  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(true);
  const [cancelVisibility, setCancelVisibility] = useState<boolean>(false);
  
  const [desktopColorDefault, setDesktopColorDefault] = useState<boolean>(true);

  useEffect( () => {
    if (largeScreenRender) {
      setDesktopColorDefault(false)
    } else {
      setDesktopColorDefault(true)
    }
  },[largeScreenRender])


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
        className={`cursor-pointer h-6`}
        onMouseEnter={() => {
          setTextOnDisplay("Toggle sound on/off");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      />
      {/* <VolumeON className="h-6"/> */}
      <Desktop
        className={`cursor-pointer h-6 ${desktopColorDefault ? "" : "bg-green-500" }`}
        onMouseEnter={() => {
          setTextOnDisplay("Desktop mode (controls never visible)");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      />
      <Confirm
        className={`h-6 cursor-pointer ${
          confirmVisibility ? "visible" : "invisible"
        }`}
        onClick={toggleIcons}
        onMouseEnter={() => {
          setTextOnDisplay("Confirm top score deletion");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      />
      <DeleteTopScore
        className={`h-6 cursor-pointer ${
          deleteVisibility ? "visible" : "hidden"
        }`}
        onClick={toggleIcons}
        onMouseEnter={() => {
          setTextOnDisplay("Delete top score");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      />
      <Cancel
        className={`h-6 cursor-pointer ${
          cancelVisibility ? "visible" : "hidden"
        }`}
        onClick={toggleIcons}
        onMouseEnter={() => {
          setTextOnDisplay("Cancel");
        }}
        onMouseLeave={() => {
          setTextOnDisplay("");
        }}
      />
      {/* <Confirm className="h-6" /> */}
    </div>
  );
}

export default UpperRightSettings;
