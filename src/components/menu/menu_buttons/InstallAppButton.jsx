import React, { useContext } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import SmartphoneIcon from "../../../assets/img/icons/SmartphoneIcon";

export default function InstallAppButton() {
  const { resetMenuData, deferredPrompt, setDeferredPrompt } =
    useContext(AppContexts);

  const onInstall = async () => {
    resetMenuData();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  return (
    <li>
      <button onClick={onInstall}>
        <SmartphoneIcon />
        Install the App
      </button>
    </li>
  );
}
