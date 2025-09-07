import { useContext } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../utils/requests/serverRequests";
import commentValidator from "../utils/validators/commentValidator";
import toast from "react-hot-toast";
import { AppContexts } from "../contexts/AppContext";
import useError from "./useError.js";
import { ScrollContentContext } from "../contexts/ScrollContentContext.jsx";
import { ProfileContext } from "../contexts/ProfileContext.jsx";

export default function useInteractions(interactionsContext = {}) {
  const { comment, setComment, commentList, setCommentList } =
    interactionsContext;

  const {
    userData,
    setDiscoverContentList,
    likesContentList,
    setLikesContentList,
  } = useContext(AppContexts);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { activeContent, contentList, setContentList } =
    useContext(ScrollContentContext);
  const { errorHandler } = useError();

  const onLoadComment = async () => {
    try {
      const excludedIds = commentList.map((e) => e._id);
      const { data } = await postRequest(
        `/interaction/comments/${activeContent._id}`,
        {
          excludedIds,
        }
      );

      const newState = [...commentList, ...data.comments];
      setCommentList(newState);
      editCommentCount(data.commentCount);

      return data.commentCount === newState.length;
    } catch (error) {
      errorHandler(error);
    }
  };

  // LIKE COMMENT
  const onLikeComment = (id, i) => {
    postRequest("/interaction/like-comment/" + id).then(({ data }) => {
      const newState = [...commentList];
      newState[i].isLiked = data.isLiked;
      newState[i].likeCount += data.count;
      setCommentList(newState);
    });
  };

  // ADD COMMENT ON CONTENT
  const onAddComment = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Posting comment...");

    try {
      commentValidator(comment, userData);

      let path = "/interaction/comment-content/" + activeContent._id;

      const { data } = await postRequest(path, { comment });

      setCommentList((p) => [...p, data.commentData]);
      editCommentCount(data.commentCount);
      setComment("");
      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadingToast);
    }
  };

  const editCommentCount = (count) => {
    let newContentList = [...contentList];
    newContentList[activeContent.index].commentCount = count;
    setContentList(newContentList);
  };

  const onDeleteComment = async (id) => {
    const loadingToast = toast.loading("Deleting comment...");
    try {
      const { data } = await deleteRequest("/interaction/comment/" + id);

      setCommentList((p) => p.filter((e) => e._id !== id));

      editCommentCount(data.commentCount);
      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadingToast);
    }
  };

  const onLikeContent = async (contentId) => {
    try {
      const { data } = await postRequest(
        "/interaction/like-content/" + contentId
      );

      setDiscoverContentList((p) =>
        p.map((e) => likeStateUpdate(e, data, contentId))
      );

      setLikesContentList((p) =>
        p.map((e) => likeStateUpdate(e, data, contentId))
      );
      setContentList((p) => p.map((e) => likeStateUpdate(e, data, contentId)));

      const newState = [...profileData.contents].map((e) =>
        likeStateUpdate(e, data, contentId)
      );

      setProfileData((p) => ({ ...p, contents: newState }));

      if (data.isLiked) {
        const isContent = likesContentList.some(
          (e) => e._id === data.content._id
        );

        if (!isContent) {
          setLikesContentList((p) => [
            { ...data.content, addFromLikeBtn: true },
            ...p,
          ]);
        }
      } else {
        setLikesContentList((p) => p.filter((e) => e._id !== contentId));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  function likeStateUpdate(e, data, contentId) {
    if (e._id === contentId) {
      e.isLiked = data.isLiked;
      e.likeCount = data.count;
    }
    return e;
  }

  return {
    onLikeComment,
    onAddComment,
    onDeleteComment,
    onLoadComment,
    editCommentCount,
    onLikeContent,
  };
}
