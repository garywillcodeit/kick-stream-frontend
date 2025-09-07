import { useContext, useState } from "react";
import { VideoContext } from "../contexts/VideoContext";

export default function useVideoTouch() {
  const [startX, setStartX] = useState(null);
  const [stopX, setStopX] = useState(null);
  const [progressInit, setProgressInit] = useState(0);
  const {
    videoRef,
    setShowControl,
    controlTORef,
    progressBar,
    setProgressBar,
  } = useContext(VideoContext);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setProgressInit(progressBar);
    setStartX(touch.clientX);
  };

  const onTouchMove = (e) => {
    if (controlTORef.current) {
      clearTimeout(controlTORef.current);
    }

    setShowControl(true);
    videoRef.current.pause();

    if (e?.touches.length > 0) {
      const touch = e.touches[0];
      const currentX = touch.clientX;
      let moveRate = ((currentX - startX) / innerWidth) * 100;
      let newLocation = progressInit + moveRate;
      if (newLocation < 0) {
        newLocation = 0;
      } else if (newLocation > 100) {
        newLocation = 100;
      }
      setProgressBar(newLocation);
      setStopX(currentX);
    }
  };

  const onTouchEnd = () => {
    if (controlTORef.current) {
      clearTimeout(controlTORef.current);
    }

    controlTORef.current = setTimeout(() => {
      setShowControl(false);
    }, 2000);

    if (startX && stopX) {
      let newTime = (videoRef.current.duration * progressBar) / 100;
      videoRef.current.currentTime = newTime;
      videoRef.current.play();
      setStopX(null);
    }

    setStartX(null);
  };
  return { onTouchStart, onTouchMove, onTouchEnd };
}
