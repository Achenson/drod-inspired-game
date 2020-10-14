import React, { useEffect, useState, Fragment } from "react";


import UpperRightSettingsChild from "./UpperRightSettings_child";

interface Props {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;
  largeScreenRender: boolean;
  controlsVisibility: "responsive" | "alwaysOn" | "alwaysOff";
  setControlsVisibility: React.Dispatch<
    React.SetStateAction<"responsive" | "alwaysOn" | "alwaysOff">
  >;
  setTopScore: number | React.Dispatch<React.SetStateAction<number>>;
  isAudioOn: boolean;
  setIsAudioOn:  React.Dispatch<React.SetStateAction<boolean>>
}

export interface PropsChildren {
  setTextOnDisplay: React.Dispatch<React.SetStateAction<string>>;

  soundHover: "animate-pulse" | null;
  setSoundHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;

  touchHover: "animate-pulse" | null;
  setTouchHover: React.Dispatch<React.SetStateAction<"animate-pulse" | null>>;

  keyboardHover: "animate-pulse" | null;
  setKeyboardHover: React.Dispatch<
    React.SetStateAction<"animate-pulse" | null>
  >;

  touchClicked: boolean;
  setTouchClicked: React.Dispatch<React.SetStateAction<boolean>>;

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

  isAudioOn: boolean;
  setIsAudioOn:   React.Dispatch<React.SetStateAction<boolean>>
  largeScreenRender: boolean
}

function UpperRightSettings({
  setTextOnDisplay,
  largeScreenRender,
  controlsVisibility,
  setControlsVisibility,
  setTopScore,
  isAudioOn,
  setIsAudioOn
}: Props): JSX.Element {
  // const [volumeColor, setVolumeColor] = useState("text-black")

  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);
  const [deleteVisibility, setDeleteVisibility] = useState<boolean>(true);
  const [cancelVisibility, setCancelVisibility] = useState<boolean>(false);

  const [touchHover, setTouchHover] = useState<"animate-pulse" | null>(null);

  const [touchClicked, setTouchClicked] = useState<boolean>(initialTouchClicked());

  const [keyboardHover, setKeyboardHover] = useState<"animate-pulse" | null>(
    null
  );

  const [keyboardClicked, setKeyboardClicked] = useState<boolean>(initialKeyboardClicked());

  function initialTouchClicked() {
    
    switch(controlsVisibility) {
      case "responsive":
      return false;
      case "alwaysOn":
      return true;
      case "alwaysOff":
      return false;
    }
  }

  function initialKeyboardClicked() {
    switch(controlsVisibility) {
      case "responsive":
      return false;
      case "alwaysOn":
      return false;
      case "alwaysOff":
      return true;
    }
  }


  const [soundHover, setSoundHover] = useState<"animate-pulse" | null>(null);
  const [deleteHover, setDeleteHover] = useState<"animate-pulse" | null>(null);
  const [confirmHover, setConfirmHover] = useState<"animate-pulse" | null>(
    null
  );
  const [cancelHover, setCancelHover] = useState<"animate-pulse" | null>(null);


  useEffect(() => {
    if (touchClicked) {
      setControlsVisibility("alwaysOn");
      return;
    }

    if (keyboardClicked) {
      setControlsVisibility("alwaysOff");
      return;
    }

    setControlsVisibility("responsive");
  }, [touchClicked, keyboardClicked, setControlsVisibility]);

  function toggleIcons() {
    setConfirmVisibility(!confirmVisibility);
    setDeleteVisibility(!deleteVisibility);
    setCancelVisibility(!cancelVisibility);
  }

  return (
    <Fragment>
     
        <UpperRightSettingsChild
          setTextOnDisplay={setTextOnDisplay}
          soundHover={soundHover}
          setSoundHover={setSoundHover}
          touchHover={touchHover}
          setTouchHover={setTouchHover}
          keyboardHover={keyboardHover}
          setKeyboardHover={setKeyboardHover}
          touchClicked={touchClicked}
          setTouchClicked={setTouchClicked}
          keyboardClicked={keyboardClicked}
          setKeyboardClicked={setKeyboardClicked}
          cancelHover={cancelHover}
          cancelVisibility={cancelVisibility}
          confirmHover={confirmHover}
          confirmVisibility={confirmVisibility}
          deleteHover={deleteHover}
          deleteVisibility={deleteVisibility}
          setCancelHover={setCancelHover}
          setCancelVisibility={setCancelVisibility}
          setConfirmHover={setConfirmHover}
          setConfirmVisibility={setConfirmVisibility}
          setDeleteHover={setDeleteHover}
          setDeleteVisibility={setDeleteVisibility}
          toggleIcons={toggleIcons}
          setTopScore={setTopScore}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          largeScreenRender={largeScreenRender}
        />
      
    </Fragment>
  );
}

export default UpperRightSettings;
