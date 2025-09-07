import React from "react";
import { AppContexts } from "../../contexts/AppContext";
import { useContext } from "react";
import CloseIcon from "../../assets/img/icons/CloseIcon";

export default function MenuHeader() {
  const { menuData, resetMenuData } = useContext(AppContexts);

  return (
    <div
      className="header"
      onContextMenu={(e) => e.preventDefault()}
      onMouseUp={() => resetMenuData()}
    >
      <div className="top-bar"></div>
      <h4 className="menu-title">{menuData.title}</h4>
      <CloseIcon />
    </div>
  );
}
