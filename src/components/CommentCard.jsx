import React from "react";
import { useContext } from "react";
import { InteractionsContext } from "../contexts/InteractionsContext";
import CommentCM from "./context_menu/CommentCM";
import Lottie from "lottie-react";
import likeFull from "../assets/lotties/likeFull.json";
import likeEmpty from "../assets/lotties/likeEmpty.json";
import interactionCounter from "../utils/features/interactionCounter";
import useInteractions from "../hooks/useInteractions.js";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Picture from "./Picture.jsx";
import { AppContexts } from "../contexts/AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CommentCard() {
  const interactionsContext = useContext(InteractionsContext);
  const { commentList } = interactionsContext;
  const { isIOS, resetMenuData } = useContext(AppContexts);
  const { onLikeComment } = useInteractions(interactionsContext);
  const contextMenuRef = useRef(null);
  const [activeCM, setActiveCM] = useState(undefined);
  const cmRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      let index = e.target.getAttribute("data-ctn-index");

      if (index && activeCM === undefined) {
        index = parseInt(index);

        if (isIOS) {
          setActiveCM(index);
        }
      } else {
        setActiveCM(undefined);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [cmRef.current, activeCM]);

  const onContextMenu = (e, i) => {
    e.preventDefault();

    setActiveCM(i);
  };

  const onGoToProfile = (username) => {
    resetMenuData();
    navigate("/@" + username);
  };

  return (
    <>
      {commentList.map((item, index) => (
        <div
          key={index}
          className={`comment ${activeCM === index ? "active" : ""}`}
          onContextMenu={(e) => onContextMenu(e, index)}
          data-ctn-index={index}
        >
          <div className="avatar" onClick={() => onGoToProfile(item.username)}>
            <Picture urls={item.avatarUrls} alt={"Avatar"} />
          </div>
          <div className="body">
            <h3 data-ctn-index={index}>{item.username}</h3>
            <p data-ctn-index={index}>{item.comment}</p>
          </div>
          <div
            className="like-btn"
            onClick={() => onLikeComment(item._id, index)}
          >
            <Lottie
              animationData={item.isLiked ? likeFull : likeEmpty}
              className="lottie-like"
              loop={false}
            />
            <p>{interactionCounter(item.likeCount)}</p>
          </div>
          {activeCM === index && (
            <CommentCM item={item} contextMenuRef={contextMenuRef} />
          )}
        </div>
      ))}
    </>
  );
}
