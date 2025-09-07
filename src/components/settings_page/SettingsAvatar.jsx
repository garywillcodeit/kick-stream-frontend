import React, { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import Picture from "../Picture";
import toast from "react-hot-toast";

export default function SettingsAvatar() {
  const { userData, setPopup, isUploadAllowed } = useContext(AppContexts);

  const onOpenPopup = () => {
    if (!isUploadAllowed) {
      toast.error("Avatar uploads are not allowed for the moment.");
      return;
    }

    setPopup({ title: "Change avatar", component: "change-avatar" });
  };

  return (
    <button className="avatar" onClick={onOpenPopup}>
      <Picture urls={userData.avatarUrls} alt={"Avatar"} />
      <p>Change avatar</p>
    </button>
  );
}
