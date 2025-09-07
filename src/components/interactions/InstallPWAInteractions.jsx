import React, { useState } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import OptionButton from "./interaction_buttons/OptionButton";
import VolumeButton from "./interaction_buttons/VolumeButton";

export default function InstallPWAInteractions() {
  const { menuData, isMuted, setIsMuted } = useContext(AppContexts);
  const [isLocalMuted, setIsLocalMuted] = useState(true);

  const onVolumeControl = () => {
    setIsLocalMuted((p) => !p);
    setIsMuted((p) => !p);
  };

  return (
    <div className={`interactions ${menuData.component ? "visi-hidden" : ""}`}>
      <VolumeButton
        onVolumeControl={onVolumeControl}
        isLocalMuted={isLocalMuted}
        isMuted={isMuted}
      />
      <OptionButton />
    </div>
  );
}
