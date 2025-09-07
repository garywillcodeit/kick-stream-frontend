import React, { useContext } from "react";
import CheckBoxSlideInput from "../inputs/CheckBoxSlideInput";
import { AppContexts } from "../../contexts/AppContext";

export default function Notifications() {
  const { userData, setUserData } = useContext(AppContexts);

  const onToggleCheckbox = async (e) => {
    const { name, checked } = e.target;
    const notifications = { ...userData.notifications, [name]: checked };
    setUserData((p) => ({ ...p, notifications }));
  };

  return (
    <div className="subsection">
      <h2>Notification settings</h2>
      <div className="notification-block">
        <div className="data">
          <p>Login</p>
          <CheckBoxSlideInput
            id={"login"}
            name={"login"}
            value={userData.notifications.login}
            onChange={onToggleCheckbox}
          />
        </div>
        <div className="data">
          <p>Newsletter</p>
          <CheckBoxSlideInput
            id={"newsletter"}
            name={"newsletter"}
            value={userData.notifications.newsletter}
            onChange={onToggleCheckbox}
          />
        </div>
        <div className="data">
          <p>New follower</p>
          <CheckBoxSlideInput
            id={"newFollower"}
            name={"newFollower"}
            value={userData.notifications.newFollower}
            onChange={onToggleCheckbox}
          />
        </div>
        <div className="data">
          <p>New comment</p>
          <CheckBoxSlideInput
            id={"newComment"}
            name={"newComment"}
            value={userData.notifications.newComment}
            onChange={onToggleCheckbox}
          />
        </div>
      </div>
    </div>
  );
}
