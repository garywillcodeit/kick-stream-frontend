import React, { useContext } from "react";
import WhatsappIcon from "../../../assets/img/icons/WhatsappIcon";
import { AppContexts } from "../../../contexts/AppContext";

export default function WhatsappButton({ url }) {
  const { resetMenuData } = useContext(AppContexts);

  const onWAShare = () => {
    const message = `Hi!\r\n\r\nI find out an interesting video on KickStream.\r\n\r\nClick on the link to watch it!\r\n\r\n${url}`;
    url = "whatsapp://send?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
    resetMenuData();
  };
  return (
    <li>
      <button onClick={onWAShare}>
        <WhatsappIcon />
        Share on Whatsapp
      </button>
    </li>
  );
}
