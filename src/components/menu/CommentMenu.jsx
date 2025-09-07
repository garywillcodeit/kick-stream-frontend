import React, { useState } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import { useEffect } from "react";
import { InteractionsContext } from "../../contexts/InteractionsContext";
import useInteractions from "../../hooks/useInteractions.js";
import { useRef } from "react";
import CommentCard from "../CommentCard";
import SendIcon from "../../assets/img/icons/SendIcon";
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lotties/loading.json";
import { postRequest } from "../../utils/requests/serverRequests.js";
import useError from "../../hooks/useError.js";
import { ScrollContentContext } from "../../contexts/ScrollContentContext.jsx";

export default function CommentMenu() {
  const interactionsContext = useContext(InteractionsContext);
  const { comment, setComment, commentList, setCommentList } =
    interactionsContext;
  const { userData, resetMenuData, setPopup, isPWAOnIOS } =
    useContext(AppContexts);
  const { activeContent } = useContext(ScrollContentContext);
  const { onAddComment, editCommentCount } =
    useInteractions(interactionsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isLastItem, setIsLastItem] = useState(false);
  const commentDivRef = useRef(null);
  const detectorRef = useRef(null);
  const { errorHandler } = useError();

  useEffect(() => {
    onLoadComment().then(() => {
      const { top } = detectorRef.current.getBoundingClientRect();
      if (top <= innerHeight + 10 && !isLastItem) {
        onLoadComment();
      }
    });
  }, []);

  const onScroll = () => {
    const { top } = detectorRef.current.getBoundingClientRect();
    if (top <= innerHeight && !isLastItem) {
      setTimeout(() => {
        onLoadComment();
      }, 500);
    }
  };

  const changeHandler = (e) => {
    let { value } = e.target;

    value = value.split("").slice(0, 200).join("");
    setComment(value);
  };

  const onLogin = () => {
    resetMenuData();
    setPopup({
      title: "Login",
      component: "login-required",
      description: "You must be logged in to leave a comment.",
    });
  };

  async function onLoadComment() {
    try {
      if (!isLastItem) {
        setIsLoading(true);
        const excludedIds = commentList.map((e) => e._id);
        const { data } = await postRequest(
          `/interaction/get-comments/${activeContent._id}`,
          {
            excludedIds,
          }
        );
        if (data.comments.length === 0) {
          setIsLastItem(true);
          editCommentCount(0);
        } else {
          const newState = [...commentList, ...data.comments];
          setCommentList(newState);
          editCommentCount(data.commentCount);
        }
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div
        ref={commentDivRef}
        className={`comment-wrapper`}
        onScroll={onScroll}
      >
        {!isLoading && commentList.length === 0 && (
          <p className="pad-bot-20 pad-lr-20">
            There is no comment yet. Post the first one !
          </p>
        )}
        <CommentCard commentList={commentList} />
        {isLoading && !isLastItem && (
          <Lottie animationData={loadingLottie} loop className="lottie" />
        )}

        <div ref={detectorRef}></div>
      </div>
      {userData.isLogged ? (
        <>
          <form className="comment-text-input-wrapper" onSubmit={onAddComment}>
            <div className="inner-form">
              <input
                className="input-text"
                placeholder={"Write your comment here"}
                type="text"
                value={comment}
                onChange={changeHandler}
              />
              <button>
                <SendIcon />
              </button>
            </div>
            <p className="counter">{`${comment.length}/200`}</p>
          </form>
        </>
      ) : (
        <div className="login-btn-wrapper">
          <button onClick={onLogin} className="button yellow-btn">
            Log in to post a comment
          </button>
        </div>
      )}
    </>
  );
}
