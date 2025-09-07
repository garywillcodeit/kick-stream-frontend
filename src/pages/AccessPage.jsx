import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UnverifiedAccountSection from "../components/sections/UnverifiedAccountSection";
import AccessForm from "../components/AccessForm";
import ResetPassword from "../components/sections/ResetPassword";
import PageHelmet from "../components/PageHelmet";

export default function AccessPage({ accessType }) {
  const { menuData, userData, isCheckingLoggedUser, isPWAOnIOS } =
    useContext(AppContexts);
  const [showSection, setShowSection] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userData.isLogged) {
      navigate("/@" + userData.username);
    } else {
      setShowSection(true);
    }
  }, [userData.isLogged]);

  return (
    <>
      {!isCheckingLoggedUser && showSection && (
        <section
          className={`section ${isPWAOnIOS ? "pwa-mode" : ""} access-section ${
            menuData.component ? "disabled" : ""
          }`}
        >
          <PageHelmet metaType={pathname.replace("/", "")} />
          {["signup", "login"].includes(accessType) && (
            <div className="inner-wrapper">
              <h1>{accessType === "signup" ? "Create an account" : "Login"}</h1>
              <AccessForm accessType={accessType} />
            </div>
          )}
          {accessType === "unverified-account" && <UnverifiedAccountSection />}
          {accessType === "check-verified-account" && (
            <UnverifiedAccountSection />
          )}
          {accessType === "reset-password" && <ResetPassword />}
        </section>
      )}
    </>
  );
}
