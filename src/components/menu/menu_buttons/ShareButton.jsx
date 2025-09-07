import React, { useContext } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import ShareIcon from "../../../assets/img/icons/ShareIcon";

export default function ShareButton({ url, type }) {
  const { activeMenu } = useContext(AppContexts);

  const onShare = () => {
    activeMenu({ component: "share", title: "Share", url, type });
  };

  return (
    <li>
      <button onClick={onShare}>
        <ShareIcon />
        Share
      </button>
    </li>
  );
}
