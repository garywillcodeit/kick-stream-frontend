import Lottie from "lottie-react";
import React from "react";
import likeEmpty from "../../assets/lotties/likeEmpty.json";
import likeFull from "../../assets/lotties/likeFull.json";
import CommentIcon from "../../assets/img/icons/CommentIcon";
import OptionsIcon from "../../assets/img/icons/OptionsIcon";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import VolumeUpIcon from "../../assets/img/icons/VolumeUpIcon";
import VolumeMuteIcon from "../../assets/img/icons/VolumeMuteIcon";
import interactionCounter from "../../utils/features/interactionCounter";
import useWakeLock from "../../hooks/useWakeLock";
import { VideoContext } from "../../contexts/VideoContext";
import useInteractions from "../../hooks/useInteractions";

export default function VideoInteractions({ ctn }) {
  const { menuData, activeMenu, isMuted, setIsMuted, isIOS } =
    useContext(AppContexts);
  const { isLocalMuted, setIsLocalMuted } = useContext(VideoContext);
  const { onLikeContent } = useInteractions();
  const { requestWakeLock } = useWakeLock();

  const onOpenComments = () => {
    activeMenu({ title: "Comments", component: "comment-menu" });
    requestWakeLock();
  };

  const onVolumeControl = () => {
    setIsLocalMuted((p) => !p);
    setIsMuted((p) => !p);
  };

  const onOpenVideoOption = () => {
    activeMenu({ component: "video", title: "Option" });
  };

  return (
    <div className={`interactions ${menuData.component ? "visi-hidden" : ""}`}>
      {ctn.type === "video" && (
        <>
          <button onClick={() => onLikeContent(ctn._id)}>
            <Lottie
              animationData={ctn.isLiked ? likeFull : likeEmpty}
              className="lottie-like"
              loop={false}
            />
            <p>{interactionCounter(ctn.likeCount)}</p>
          </button>
          <button onClick={onOpenComments}>
            <CommentIcon />
            <p>{interactionCounter(ctn.commentCount)}</p>
          </button>
        </>
      )}
      <button onClick={onVolumeControl}>
        {isIOS ? (
          <>{isLocalMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}</>
        ) : (
          <>{isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}</>
        )}
      </button>
      <button onClick={onOpenVideoOption}>
        <OptionsIcon />
      </button>
    </div>
  );
}
