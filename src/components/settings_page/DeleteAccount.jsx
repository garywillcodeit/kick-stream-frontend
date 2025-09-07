import React, { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";

export default function DeleteAccount() {
  const { setPopup } = useContext(AppContexts);

  const onDeleteAccount = async () => {
    setPopup({
      component: "delete-account-infos",
      title: "Delete your account",
    });
  };

  return (
    <div className="subsection">
      <h2>Delete my account</h2>
      <p>
        To delete your account, click on the button below and follow the
        instructions.
      </p>
      <div className="disp-f">
        <button className="button delete-btn" onClick={onDeleteAccount}>
          I delete my account
        </button>
      </div>
    </div>
  );
}
