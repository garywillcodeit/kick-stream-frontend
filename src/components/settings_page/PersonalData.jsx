import React, { useContext } from "react";
import AccountIcon from "../../assets/img/icons/AccountIcon";
import EditIcon from "../../assets/img/icons/EditIcon";
import MailIcon from "../../assets/img/icons/MailIcon";
import KeyIcon from "../../assets/img/icons/KeyIcon";
import { AppContexts } from "../../contexts/AppContext";
import { isEmailUpdateAllowed } from "../../utils/validators/newEmailValidator";
import toast from "react-hot-toast";
import { isUsernameUpdateAllowed } from "../../utils/validators/newUsernameValidator";

export default function PersonalData() {
  const { setPopup, userData } = useContext(AppContexts);

  const onChangeUsername = () => {
    if (isUsernameUpdateAllowed(userData)) {
      setPopup({ component: "change-username", title: "New Username" });
    } else {
      toast.error("You have reached the daily username update limit.");
    }
  };

  const onChangeEmail = () => {
    if (isEmailUpdateAllowed(userData)) {
      setPopup({ component: "request-email-update", title: "New Email" });
    } else {
      toast.error("You have reached the daily email update limit.");
    }
  };

  const onChangePassword = () => {
    setPopup({
      component: "request-password-update",
      title: "New Password",
    });
  };

  return (
    <div className="subsection">
      <h2>Personal informations</h2>
      <div className="personal-block">
        <div className="data">
          <AccountIcon />
          <p>{userData.username}</p>
          <button className="edit-btn" onClick={onChangeUsername}>
            <EditIcon />
          </button>
        </div>
        <div className="data">
          <MailIcon />
          <p>{userData.email}</p>
          <button className="edit-btn" onClick={onChangeEmail}>
            <EditIcon />
          </button>
        </div>
        <div className="data">
          <KeyIcon />
          <button className="edit-btn" onClick={onChangePassword}>
            Change password
          </button>
        </div>
      </div>
    </div>
  );
}
