import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContexts } from "../../contexts/AppContext";
import { ScrollContentContext } from "../../contexts/ScrollContentContext";
import { VideoContext } from "../../contexts/VideoContext";

export default function ProgressBar({ ctn }) {
  const { progressBar, setProgressBar, videoRef, duration } =
    useContext(VideoContext);
  const { isMobile } = useContext(AppContexts);
  const { activeContent } = useContext(ScrollContentContext);
  const [showScrubberBar, setShowScrubberBar] = useState(false);
  const progressBarRef = useRef(null);
  const scrubberRef = useRef(null);

  useEffect(() => {
    setProgressBar(0);
  }, [activeContent]);

  useEffect(() => {
    if (activeContent._id === ctn._id && !isMobile) {
      let isMouseDown = false;
      let newPosition = 0;

      const scrubberElement = scrubberRef.current;
      const mouseMoveHandle = (e) => {
        if (videoRef.current) {
          setShowScrubberBar(true);

          if (isMouseDown) {
            const { left, width } =
              progressBarRef.current.getBoundingClientRect();

            newPosition = ((e.clientX - left) / width) * 100;
            setProgressBar(newPosition);
          }
        }
      };

      const mouseDownHandler = () => {
        isMouseDown = true;
        videoRef.current.pause();
      };

      const mouseUpHandler = () => {
        if (isMouseDown) {
          if (videoRef.current.paused) {
            videoRef.current.currentTime = (duration * newPosition) / 100;
            videoRef.current.play();
          }
          isMouseDown = false;
        }
      };

      scrubberElement.addEventListener("mousedown", mouseDownHandler);
      window.addEventListener("mousemove", mouseMoveHandle);
      window.addEventListener("mouseup", mouseUpHandler);

      return () => {
        scrubberElement.removeEventListener("mousedown", mouseDownHandler);
        window.removeEventListener("mousemove", mouseMoveHandle);
        window.removeEventListener("mouseup", mouseUpHandler);
      };
    }
  }, [videoRef.current, duration]);

  return (
    <div ref={progressBarRef} className={`progress-bar `}>
      <div style={{ width: progressBar + "%" }} className="read-part">
        {!isMobile && (
          <div className={`scrubber ${showScrubberBar ? "active" : ""}`}>
            <div
              ref={scrubberRef}
              className={`clickable-scrubber ${
                showScrubberBar ? "active" : ""
              }`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
