import React from 'react';


import { ReactComponent as VolumeOFF } from "../svgs/volumeOff.svg";
// import { ReactComponent as VolumeON } from "../svgs/volumeOn.svg";
import { ReactComponent as Delete } from "../svgs/deleteDanger.svg";
import { ReactComponent as Desktop } from "../svgs/desktop.svg";
import { ReactComponent as Cancel } from "../svgs/cancel.svg";
import { ReactComponent as Confirm } from "../svgs/confirm.svg";

interface Props {

}

function UpperRightSettings({}: Props): JSX.Element{
    return (

      <div className="flex mt-1 absolute right-0 border-2 border-black rounded-md bg-gray-200" style={{top: "3rem"}}>
      <VolumeOFF className="h-6" />
      {/* <VolumeON className="h-6"/> */}
      <Desktop className="h-6" />
      <Confirm className="h-6 invisible"/>
      <Delete className="h-6" />
      {/* <Cancel className="h-6" /> */}
      {/* <Confirm className="h-6" /> */}
    </div>
    )
     
};

export default UpperRightSettings;