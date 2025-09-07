import React, { useContext, useEffect, useRef, useState } from "react";
import useVideoTouch from "../hooks/useVideoTouch.js";
import Lottie from "lottie-react";
import lateralSwipe from "../assets/lotties/lateralSwipe.json";
import PlayIcon from "../assets/img/icons/PlayIcon";
import PauseIcon from "../assets/img/icons/PauseIcon";
import { AppContexts } from "../contexts/AppContext.jsx";
import useWakeLock from "../hooks/useWakeLock.js";
import { VideoContext } from "../contexts/VideoContext.jsx";

export default function PlayerControl() {
  const { videoRef, showControl, setShowControl, controlTORef } =
    useContext(VideoContext);
  const { isMobile } = useContext(AppContexts);
  const { onTouchStart, onTouchMove, onTouchEnd } = useVideoTouch();
  const [isPaused, setIsPaused] = useState(false);
  const { requestWakeLock } = useWakeLock();

  useEffect(() => {
    const video = videoRef.current;
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);

    if (video) {
      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
    }

    return () => {
      if (video) {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
      }
    };
  }, []);

  const playBtnRef = useRef(null);

  const onPlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      requestWakeLock();

      controlTORef.current = setTimeout(() => {
        setShowControl(false);
      }, 2000);
    } else {
      videoRef.current.pause();
      clearTimeout(controlTORef.current);
    }
  };

  return (
    <div
      className={`player-control ${showControl ? "active" : ""}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onContextMenu={(e) => e.preventDefault()}
    >
      {isMobile && (
        <Lottie animationData={lateralSwipe} className="lottie-swipe" />
      )}
      <div ref={playBtnRef} className="lottie-play" onClick={onPlayPause}>
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </div>
    </div>
  );
}
