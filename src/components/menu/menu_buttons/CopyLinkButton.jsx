import React, { useContext } from "react";
import LinkIcon from "../../../assets/img/icons/LinkIcon";
import toast from "react-hot-toast";
import { AppContexts } from "../../../contexts/AppContext";

export default function CopyLinkButton({ url }) {
  const { resetMenuData } = useContext(AppContexts);

  const onCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Link copied in the clipboard");
      resetMenuData();
    } else {
      toast.error("Cannot copy to clipboard.");
    }
  };

  return (
    <li>
      <button onClick={onCopyUrl}>
        <LinkIcon style={{ fill: "white" }} />
        Copy profile link
      </button>
    </li>
  );
}
