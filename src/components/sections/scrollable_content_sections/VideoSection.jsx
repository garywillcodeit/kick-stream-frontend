import React, { useContext, useEffect, useState } from "react";
import LoadingBlur from "../../LoadingBlur";
import PlayerControl from "../../PlayerControl";
import ProgressBar from "../../progress_bars/NavProgressBar";
import FollowCard from "../../FollowCard";
import {
  getRequest,
  postRequest,
} from "../../../utils/requests/serverRequests";
import { ScrollContentContext } from "../../../contexts/ScrollContentContext";
import { AppContexts } from "../../../contexts/AppContext";
import { VideoContext } from "../../../contexts/VideoContext";
import VideoInteractions from "../../interactions/VideoInteractions";
export default function VideoSection({ ctn, index, refs }) {
  const { isMuted, isIOS, popup, menuData } = useContext(AppContexts);
  const {
    setProgressBar,
    setShowControl,
    setDuration,
    videoRef,
    controlTORef,
    isLocalMuted,
  } = useContext(VideoContext);
  const { activeContent } = useContext(ScrollContentContext);

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [callViewRequest, setCallViewRequest] = useState(false);

  useEffect(() => {
    if (activeContent._id === ctn._id) {
      setIsLoadingPage(true);
    }
  }, [activeContent._id]);

  useEffect(() => {
    if (activeContent._id === ctn._id) {
      if (videoRef.current) {
        if (popup.component || menuData.component) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    }
  }, [activeContent._id, menuData, popup]);

  const touchStartHandler = (e) => {
    setShowControl(true);

    if (controlTORef.current) {
      clearTimeout(controlTORef.current);
    }

    controlTORef.current = setTimeout(() => {
      setShowControl(false);
    }, 2000);
  };

  const onTimeUpdate = async (e) => {
    const { currentTime: current, duration } = e.target;

    setDuration(duration);
    setProgressBar((current / duration) * 100);

    if (current >= 3 && !callViewRequest) {
      await postRequest("/interaction/view/" + activeContent._id);
      setCallViewRequest(true);
    }
  };

  return (
    <div
      data-id={ctn._id}
      data-index={index}
      ref={(el) => (refs.current[index] = el)}
      className="home-content-wrapper"
    >
      {ctn._id === activeContent._id && (
        <>
          <video
            ref={videoRef}
            data-title={ctn.title}
            controls={false}
            autoPlay
            onTimeUpdate={onTimeUpdate}
            onLoadedData={() => setIsLoadingPage(false)}
            playsInline
            disablePictureInPicture
            muted={isIOS ? isLocalMuted : isMuted}
            loop
            preload={"auto"}
            onMouseMove={touchStartHandler}
            onTouchStart={touchStartHandler}
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={ctn.videoUrl} type="video/mp4" />
          </video>
          {activeContent.type === "video" && <ProgressBar ctn={ctn} />}
          <LoadingBlur isLoadingPage={isLoadingPage} />
          {activeContent.type === "video" && (
            <PlayerControl section={"nav-player"} />
          )}
          <VideoInteractions ctn={ctn} />
          <div className="content-data">
            <FollowCard user={ctn?.user} className={"under-600"} />
            <h2 className={`description`}>
              <p className="main-title">{ctn.title}</p>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
