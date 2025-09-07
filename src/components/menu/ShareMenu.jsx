import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import WhatsappButton from "./menu_buttons/WhatsappButton";
import TwitterButton from "./menu_buttons/TwitterButton";
import CopyLinkButton from "./menu_buttons/CopyLinkButton";

export default function ShareMenu() {
  const { menuData } = useContext(AppContexts);

  return (
    <>
      <ul className="share">
        <CopyLinkButton url={menuData.url} />
        <TwitterButton url={menuData.url} />
        <WhatsappButton url={menuData.url} />
      </ul>
    </>
  );
}
