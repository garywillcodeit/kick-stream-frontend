import React, { useContext } from "react";
import DeleteIcon from "../../../assets/img/icons/DeleteIcon.jsx";
import useError from "../../../hooks/useError.js";
import toast from "react-hot-toast";
import { deleteRequest } from "../../../utils/requests/serverRequests.js";
import { InteractionsContext } from "../../../contexts/InteractionsContext.jsx";
import useInteractions from "../../../hooks/useInteractions.js";

export default function DeleteCommentButton({ itemId }) {
  const interactionsContext = useContext(InteractionsContext);
  const { commentList, setCommentList } = interactionsContext;
  const { errorHandler } = useError();
  const { editCommentCount } = useInteractions(interactionsContext);

  const onDelete = async () => {
    const loadToast = toast.loading("Deleting video...");

    try {
      const path = "/interaction/comment/" + itemId;
      const { data } = await deleteRequest(path);

      let comments = [...commentList];
      comments = comments.filter((e) => e._id !== itemId);
      setCommentList(comments);
      editCommentCount(data.commentCount);
      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return (
    <li>
      <button onClick={onDelete}>
        <DeleteIcon />
        Delete
      </button>
    </li>
  );
}
