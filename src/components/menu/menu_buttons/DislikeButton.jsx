import React, { useContext } from "react";
import toast from "react-hot-toast";
import {
  getRequest,
  postRequest,
} from "../../../utils/requests/serverRequests";
import useError from "../../../hooks/useError";
import DislikeIcon from "../../../assets/img/icons/DislikeIcon";
import { AppContexts } from "../../../contexts/AppContext";
import { ScrollContentContext } from "../../../contexts/ScrollContentContext";
import indexesAdding from "../../../utils/features/indexesAdding";

export default function DislikeButton({ slug }) {
  const { errorHandler } = useError();
  const { resetMenuData } = useContext(AppContexts);
  const { contentList, setContentList, setActiveContent, activeContent } =
    useContext(ScrollContentContext);

  const onContentDislike = async () => {
    const request = postRequest("/interaction/dislike-content/" + slug);
    await toast.promise(request, {
      laoding: "Disliking...",
      success: ({ data }) => {
        let nextContent = contentList.find(
          (e) => e.index === activeContent.index + 1
        );

        if (nextContent) {
          let contents = [...contentList].filter(
            (e) => e._id !== activeContent._id
          );
          contents = indexesAdding(contents);
          nextContent = contents.find((e) => e._id === nextContent._id);

          setContentList(contents);
          setActiveContent(nextContent);
        }

        resetMenuData();

        return data.msg;
      },
      error: (error) => errorHandler(error),
    });
  };

  return (
    <li>
      <button onClick={onContentDislike}>
        <DislikeIcon />
        Dislike
      </button>
    </li>
  );
}
