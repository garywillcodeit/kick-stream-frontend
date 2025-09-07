import React, { createContext, useRef, useState } from "react";

export const VideoContext = createContext();

export default function VideoContextProvider({ children }) {
  const [progressBar, setProgressBar] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isLocalMuted, setIsLocalMuted] = useState(true);
  const videoRef = useRef(null);
  const controlTORef = useRef(null);

  return (
    <VideoContext.Provider
      value={{
        progressBar,
        setProgressBar,
        showControl,
        setShowControl,
        duration,
        setDuration,
        isLocalMuted,
        setIsLocalMuted,
        videoRef,
        controlTORef,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
