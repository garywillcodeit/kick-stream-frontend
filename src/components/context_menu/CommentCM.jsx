import React from "react";
import ReportButton from "../menu/menu_buttons/ReportButton";
import DeleteCommentButton from "../menu/menu_buttons/DeleteCommentButton";

export default function CommentCM({ item, contextMenuRef }) {
  return (
    <ul ref={contextMenuRef} className="context-menu">
      {item?.commentFromThisUser ? (
        <DeleteCommentButton itemId={item._id} />
      ) : (
        <ReportButton type={"comment"} itemId={item._id} />
      )}
    </ul>
  );
}
