import React from "react";
import LikeFullIcon from "../../assets/img/icons/LikeFullIcon";
import CommentFullIcon from "../../assets/img/icons/CommentFullIcon";
import interactionCounter from "../../utils/features/interactionCounter";

export default function HoverData({ data }) {
  return (
    <div className="data">
      <div>
        <LikeFullIcon className={"icon"} />
        <p>{interactionCounter(data.likeCount)}</p>
      </div>
      <div>
        <CommentFullIcon />
        <p>{interactionCounter(data.commentCount)}</p>
      </div>
    </div>
  );
}
