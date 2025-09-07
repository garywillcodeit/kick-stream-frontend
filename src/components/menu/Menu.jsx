import React, { useEffect } from "react";
import { AppContexts } from "../../contexts/AppContext";
import { useContext } from "react";
import CommentMenu from "./CommentMenu";
import MenuHeader from "./MenuHeader";
import { useRef } from "react";
import InteractionsContextProvider from "../../contexts/InteractionsContext";
import ConfirmDeletionMenu from "./ConfirmDeletionMenu";
import ReportMenu from "./ReportMenu";
import CommonMenu from "./CommonMenu";
import ShareMenu from "./ShareMenu";
import VideoMenu from "./VideoMenu";

export default function Menu() {
  const { menuData, setMenuData, resetMenuData, isPWAOnIOS } =
    useContext(AppContexts);
  const menuRef = useRef(null);

  useEffect(() => {
    setMenuData((p) => ({ ...p, ref: menuRef.current }));
  }, []);

  const onBlurPartClick = (e) => {
    if (!menuRef.current.contains(e.target)) {
      resetMenuData();
    }
  };

  return (
    <div
      className={`menu-screen-background  ${
        menuData.displayed ? "active" : ""
      }`}
      onClick={onBlurPartClick}
    >
      <div
        ref={menuRef}
        className={`menu ${menuData.component} ${isPWAOnIOS ? "pwa-mode" : ""}
        `}
      >
        <MenuHeader />

        {menuData.component === "comment-menu" && (
          <InteractionsContextProvider>
            <CommentMenu />
          </InteractionsContextProvider>
        )}
        {menuData.component === "confirm-deletion" && <ConfirmDeletionMenu />}
        {menuData.component === "report" && <ReportMenu />}
        {menuData.component === "common" && <CommonMenu />}
        {menuData.component === "share" && <ShareMenu />}
        {menuData.component === "video" && <VideoMenu />}
      </div>
    </div>
  );
}
