import React, { useContext, useEffect, useState } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import LoadingBlur from "../../../components/LoadingBlur";
import VolumeButton from "../../../components/interactions/interaction_buttons/VolumeButton";
import OptionButton from "../../../components/interactions/interaction_buttons/OptionButton";
import { ScrollContentContext } from "../../../contexts/ScrollContentContext";

export default function InstallPWA({ ctn, index, refs }) {
  const {
    isMuted,
    isIOS,
    setIsMuted,
    menuData,
    deferredPrompt,
    setDeferredPrompt,
  } = useContext(AppContexts);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLocalMuted, setIsLocalMuted] = useState(true);
  const { activeContent } = useContext(ScrollContentContext);

  useEffect(() => {
    if (activeContent._id === ctn._id) {
      setIsLoadingPage(true);
    }
  }, [activeContent._id]);

  const onInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const onVolumeControl = () => {
    setIsLocalMuted((p) => !p);
    setIsMuted((p) => !p);
  };

  return (
    <div
      data-id={ctn._id}
      data-index={index}
      ref={(el) => (refs.current[index] = el)}
      className="home-content-wrapper"
    >
      {ctn.index === activeContent.index && (
        <>
          <video
            data-title={ctn.title}
            controls={false}
            autoPlay
            onLoadedData={() => setIsLoadingPage(false)}
            playsInline
            disablePictureInPicture
            muted={isIOS ? isLocalMuted : isMuted}
            loop
            preload={"auto"}
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={ctn.videoUrl} type="video/mp4" />
          </video>

          <LoadingBlur isLoadingPage={isLoadingPage} />
        </>
      )}
      <div
        className={`interactions ${menuData.component ? "visi-hidden" : ""}`}
      >
        <VolumeButton
          onVolumeControl={onVolumeControl}
          isLocalMuted={isLocalMuted}
          isMuted={isMuted}
        />
        <OptionButton />
      </div>
      <div className="install-pwa-btn">
        <button className="button" onClick={onInstall}>
          Install the App
        </button>
      </div>
    </div>
  );
}
