import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";

export default function SocialUserChangeIDPopup() {
  const { resetPopup } = useContext(AppContexts);

  const onClosePopup = () => resetPopup();
  return (
    <div className="popup common-popup">
      <p>
        You are logged in from a Google account. It is therefore impossible for
        you to change your email or password.
      </p>
      <button className="button" onClick={onClosePopup}>
        Close
      </button>
    </div>
  );
}
