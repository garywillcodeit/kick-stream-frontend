import React, { useContext } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import VolumeMuteIcon from "../../../assets/img/icons/VolumeMuteIcon";
import VolumeUpIcon from "../../../assets/img/icons/VolumeUpIcon";

export default function VolumeButton({
  onVolumeControl,
  isMuted,
  isLocalMuted,
}) {
  const { isIOS } = useContext(AppContexts);
  return (
    <button onClick={onVolumeControl}>
      {isIOS ? (
        <>{isLocalMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}</>
      ) : (
        <>{isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}</>
      )}
    </button>
  );
}
