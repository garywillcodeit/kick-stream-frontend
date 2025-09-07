import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import LogoutButton from "./menu_buttons/LogoutButton";
import ReportButton from "./menu_buttons/ReportButton";
import ShareButton from "./menu_buttons/ShareButton";
import { getProfileUrl } from "../../utils/features/getUrl";
import ContactUsButton from "./menu_buttons/ContactUsButton";
import TermOsUseButton from "./menu_buttons/TermOsUseButton";
import PrivacyPolicyButton from "./menu_buttons/PrivacyPolicyButton";
import GetProfileEmailButton from "./menu_buttons/GetProfileEmailButton";
import RefreshButton from "./menu_buttons/RefreshButton";
import { ProfileContext } from "../../contexts/ProfileContext";
import InstallAppButton from "./menu_buttons/InstallAppButton";

export default function CommonMenu() {
  const { userData, isPWA, isAndroid } = useContext(AppContexts);
  const { profileData } = useContext(ProfileContext);
  const { username } = useParams();
  const { pathname } = useLocation();
  const [showRefreshbtn, setShowRefreshBtn] = useState(false);
  const [showSharebtn, setShowShareBtn] = useState(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [showReportBtn, setShowReportBtn] = useState(false);

  useEffect(() => {
    switch (true) {
      case pathname === "/discover" || pathname === "/my-likes":
        setShowRefreshBtn(true);
        setShowShareBtn(false);
        setShowLogoutBtn(false);
        setShowLogoutBtn(false);
        setShowReportBtn(false);
        break;

      case pathname === "/login" || pathname === "/signup":
        setShowRefreshBtn(false);
        setShowShareBtn(false);
        setShowLogoutBtn(false);
        setShowLogoutBtn(false);
        setShowReportBtn(false);
        break;

      case pathname === "/terms-of-use" || pathname === "/privacy-policy":
        setShowRefreshBtn(true);
        setShowShareBtn(false);
        setShowLogoutBtn(false);
        setShowReportBtn(false);
        break;

      case userData.isLogged && pathname === `/@${userData.username}`:
        setShowRefreshBtn(true);
        setShowShareBtn(true);
        setShowLogoutBtn(true);
        setShowReportBtn(false);
        break;

      case pathname === `/${username}` && pathname !== "/@" + userData.username:
        setShowRefreshBtn(true);
        setShowShareBtn(true);
        setShowLogoutBtn(false);
        setShowReportBtn(true);
        break;

      case pathname === `/settings`:
        setShowRefreshBtn(true);
        setShowShareBtn(false);
        setShowLogoutBtn(true);
        setShowReportBtn(false);
        break;
    }
  }, []);

  return (
    <ul className="profile">
      {showRefreshbtn && <RefreshButton />}
      {showSharebtn && (
        <ShareButton url={getProfileUrl(username)} type={"profile"} />
      )}
      {profileData?.contactEmail && <GetProfileEmailButton />}
      <ContactUsButton />
      <TermOsUseButton />
      <PrivacyPolicyButton />
      {showLogoutBtn && (
        <>
          <LogoutButton />
          <LogoutButton fromAll={true} />
        </>
      )}

      {showReportBtn && <ReportButton type={"profile"} itemId={username} />}
      {isAndroid && !isPWA && <InstallAppButton />}
    </ul>
  );
}
