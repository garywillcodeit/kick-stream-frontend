import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import ChangeUsernamePopup from "./ChangeUsernamePopup";
import ChangeEmailRequestPopup from "./ChangeEmailRequestPopup";
import ChangePasswordPopup from "./ChangePasswordRequestPopup";
import SocialUserChangeIDPopup from "./SocialUserChangeIDPopup";
import ChangeAvatarPopup from "./ChangeAvatarPopup";
import RequestDeleteAccountPopup from "./RequestDeleteAccountPopup";
import DeleteAccountInfosPopup from "./DeleteAccountInfosPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import ValidationEmailUpdatePopup from "./ValidationEmailUpdatePopup";
import ValidationPasswordUpdatePopup from "./ValidationPasswordUpdatePopup";
import ConfirmDeleteAccountPopup from "./ConfirmDeleteAccountPopup";
import ThickCloseIcon from "../../assets/img/icons/ThickCloseIcon";
import LoginRequiredPopup from "./LoginRequiredPopup";
import FirstLoginPopup from "./first_login_popup/FirstLoginPopup";
import { getRequest } from "../../utils/requests/serverRequests";
import { useNavigate } from "react-router-dom";
import VerifyAgePopup from "./VerifyAgePopup";

export default function Popup() {
  const { setUserData, popup, resetPopup, userData } = useContext(AppContexts);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    const handlerEscape = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        onClosePopup();
      }
    };

    document.addEventListener("keyup", handlerEscape);

    return () => {
      document.removeEventListener("keyup", handlerEscape);
    };
  }, [popup.videoRef, userData]);

  const onClosePopup = async () => {
    let newState = { ...userData };
    newState.newEmail = "";
    newState.password = "";
    newState.newPassword = "";
    newState.avatar = {};
    newState.validationCode = "";
    setUserData(newState);

    if (popup.component === "first-login") {
      await getRequest("/user/first-login/abort");

      navigate("/settings");
    }

    resetPopup();
  };

  return (
    <div
      ref={popupRef}
      className={`popup-wrapper ${popup.component ? "active" : ""} ${
        popup.component === "verify-age" ? "" : "section-only"
      } ${popup.component}`}
    >
      <h2>{popup.title}</h2>

      {popup.component === "change-username" && <ChangeUsernamePopup />}
      {popup.component === "request-email-update" && (
        <ChangeEmailRequestPopup />
      )}
      {popup.component === "validation-email-update" && (
        <ValidationEmailUpdatePopup />
      )}
      {popup.component === "request-password-update" && <ChangePasswordPopup />}
      {popup.component === "validation-password-update" && (
        <ValidationPasswordUpdatePopup />
      )}
      {popup.component === "delete-account-infos" && (
        <DeleteAccountInfosPopup />
      )}
      {popup.component === "request-delete-account" && (
        <RequestDeleteAccountPopup />
      )}
      {popup.component === "confirm-delete-account" && (
        <ConfirmDeleteAccountPopup />
      )}
      {popup.component === "social-user-change-email" && (
        <SocialUserChangeIDPopup />
      )}
      {popup.component === "change-avatar" && <ChangeAvatarPopup />}
      {popup.component === "forgot-password" && <ForgotPasswordPopup />}
      {popup.component === "login-required" && <LoginRequiredPopup />}
      {popup.component === "first-login" && <FirstLoginPopup />}
      {popup.component === "verify-age" && <VerifyAgePopup />}

      {popup.component !== "verify-age" && (
        <div onClick={onClosePopup}>
          <ThickCloseIcon className={"close-btn"} />
        </div>
      )}
    </div>
  );
}
