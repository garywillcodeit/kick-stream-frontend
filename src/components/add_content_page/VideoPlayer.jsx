import React, { useContext } from "react";
import AddCtnProgressBar from "../progress_bars/AddCtnProgressBar";
import { AddEditContentContext } from "../../contexts/AddEditContentContext";

export default function VideoPlayer() {
  const { contentData, videoRef, setDuration, setProgressBar } = useContext(
    AddEditContentContext
  );

  const onTimeUpdate = (e) => {
    const { currentTime: current, duration } = e.target;
    setDuration(duration);
    setProgressBar((current / duration) * 100);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={contentData.videoUrl}
        autoPlay
        preload="auto"
        muted
        playsInline
        onTimeUpdate={onTimeUpdate}
        loop
      />
      <AddCtnProgressBar />
    </div>
  );
}
