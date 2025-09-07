import React, { useContext } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import toast from "react-hot-toast";
import AtIcon from "../../../assets/img/icons/AtIcon";
import { ProfileContext } from "../../../contexts/ProfileContext";

export default function GetProfileEmailButton() {
  const { resetMenuData } = useContext(AppContexts);
  const { profileData } = useContext(ProfileContext);

  const onGetEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileData.contactEmail);
      toast.success("Email copied in the clipboard");
      resetMenuData();
    } else {
      toast.error("Cannot copy to clipboard.");
    }
  };
  return (
    <li>
      <button onClick={onGetEmail}>
        <AtIcon />
        Get profile email
      </button>
    </li>
  );
}
