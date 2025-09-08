import React, { useContext } from "react";
import TwitterIcon from "../../../assets/img/icons/TwitterIcon";
import { AppContexts } from "../../../contexts/AppContext";

export default function TwitterButton({ url, image }) {
  const { resetMenuData, menuData } = useContext(AppContexts);

  const onTwitterShare = () => {
    const message = `Hi guys!\r\n\r\nI find out an interesting ${menuData.type} on KickStream.\r\n\r\nClick on the link to watch it!\r\n\r\n`;
    const encodedUrl = "url=" + encodeURIComponent(url);
    const encodedText = "&text=" + encodeURIComponent(message);
    const encodedImage = "&media=" + encodeURIComponent(image);

    url =
      "https://twitter.com/intent/tweet?" +
      encodedUrl +
      encodedText +
      encodedImage;

    window.open(url, "_blank");

    resetMenuData();
  };

  return (
    <li>
      <button onClick={onTwitterShare}>
        <TwitterIcon />
        Share on X
      </button>
    </li>
  );
}
