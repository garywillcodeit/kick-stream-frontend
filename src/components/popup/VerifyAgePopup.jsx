import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { getRequest } from "../../utils/requests/serverRequests";
import { minorsExitUrl } from "../../utils/data/minorsExitUrl";
import useWakeLock from "../../hooks/useWakeLock.js";

export default function VerifyAgePopup() {
  const { resetPopup, setVerifiedAge } = useContext(AppContexts);
  const { requestWakeLock } = useWakeLock();

  const onConfirmAge = () => {
    const toastId = toast.loading("Loading...");

    getRequest("/check/set-age-cookie")
      .then(() => {
        setVerifiedAge(true);
        requestWakeLock();
        resetPopup();
      })
      .finally(() => toast.dismiss(toastId));
  };

  const onLeaveWebsite = () => {
    window.location.href = minorsExitUrl;
  };

  return (
    <div className="popup verify-age">
      <p>
        WARNING : This website is intended for an adult audience. If you are
        under 18, please leave this Website immediately.
      </p>
      <p>ARE YOU SURE YOU WANT TO ACCESS ?</p>
      <button className="button" onClick={onConfirmAge}>
        Yes, I am 18 or older
      </button>
      <button className="button red-btn" onClick={onLeaveWebsite}>
        No, I am under 18
      </button>
    </div>
  );
}
