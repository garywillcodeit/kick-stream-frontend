import React, { useContext } from "react";
import ReportButton from "../menu/menu_buttons/ReportButton";
import { AppContexts } from "../../contexts/AppContext";
import DeleteButton from "../menu/menu_buttons/DeleteButton";
import EditButton from "../menu/menu_buttons/EditButton";
import WatchButton from "../menu/menu_buttons/WatchButton";
import ShareButton from "../menu/menu_buttons/ShareButton";
import LikeButton from "../menu/menu_buttons/LikeButton";
import { useParams } from "react-router-dom";
import { getUrlFromSlug } from "../../utils/features/getUrl";

export default function ContentGridCM({ content, cmRef, style }) {
  const { userData } = useContext(AppContexts);
  const url = getUrlFromSlug(content.slug);
  const { username } = useParams();

  return (
    <ul ref={cmRef} style={style} className="context-menu">
      <WatchButton slug={content.slug} />
      <LikeButton content={content} />
      <ShareButton url={url} type={"video"} />
      {username && username.replace("@", "") === userData?.username ? (
        <>
          <EditButton slug={content.slug} />
          <DeleteButton type={"video"} itemId={content._id} />
        </>
      ) : (
        <>
          <ReportButton type={"video"} itemId={content.slug} />
        </>
      )}
    </ul>
  );
}
