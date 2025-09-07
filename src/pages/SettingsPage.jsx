import React from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHelmet from "../components/PageHelmet";
import AccountSkeleton from "../components/skeletons/AccountSkeleton";
import PersonalData from "../components/settings_page/PersonalData.jsx";
import AccountDescription from "../components/settings_page/AccountDescription.jsx";
import SocialNetworks from "../components/settings_page/SocialNetworks.jsx";
import WebsiteContact from "../components/settings_page/WebsiteContact.jsx";
import Notifications from "../components/settings_page/Notifications.jsx";
import DeleteAccount from "../components/settings_page/DeleteAccount.jsx";
import SettingsAvatar from "../components/settings_page/SettingsAvatar.jsx";

export default function SettingsPage() {
  const { menuData, userData, resetUserData, isPWAOnIOS } =
    useContext(AppContexts);
  const [showSection, setShowSection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.isLogged) {
      setShowSection(true);
    } else if (!userData.isFetching) {
      resetUserData();
      navigate("/login");
    }
  }, [userData.isLogged, userData.isFetching]);

  return (
    <>
      <section
        className={`section ${isPWAOnIOS ? "pwa-mode" : ""} settings-section ${
          menuData.component ? "disabled" : ""
        }`}
      >
        <PageHelmet />
        <div className="inner-wrapper">
          {showSection ? (
            <>
              <SettingsAvatar />
              <PersonalData />
              <AccountDescription />
              <SocialNetworks />
              <WebsiteContact />
              <Notifications />
              <DeleteAccount />
            </>
          ) : (
            <AccountSkeleton />
          )}
        </div>
      </section>
    </>
  );
}
