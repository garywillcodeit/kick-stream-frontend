import React from "react";
import LikeFullIcon from "../../../assets/img/icons/LikeFullIcon";
import useInteractions from "../../../hooks/useInteractions";

export default function LikeButton({ content }) {
  const { onLikeContent } = useInteractions();

  return (
    <li>
      <button onClick={() => onLikeContent(content._id)}>
        <LikeFullIcon className={content.isLiked ? "liked" : ""} />
        {content.isLiked ? "Unlike" : "Like"}
      </button>
    </li>
  );
}
