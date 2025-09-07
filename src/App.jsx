import React from "react";
import Popup from "./components/popup/Popup.jsx";
import { useContext } from "react";

import { useEffect } from "react";
import Menu from "./components/menu/Menu.jsx";
import SearchSection from "./components/sections/SearchSection.jsx";
import useAccess from "./hooks/useAccess.js";
import ScrollContentContextProvider from "./contexts/ScrollContentContext.jsx";
import LeftNavBar from "./components/navbars/LeftNavBar.jsx";
import { Outlet } from "react-router-dom";
import RightNavBar from "./components/navbars/RightNavBar.jsx";
import Header from "./components/Header.jsx";
import MobileNavBar from "./components/navbars/MobileNavBar.jsx";
import ProfileContextProvider from "./contexts/ProfileContext.jsx";
import { AppContexts } from "./contexts/AppContext.jsx";

export default function App() {
  const { setPopup, setDeferredPrompt } = useContext(AppContexts);
  const { onGetLoggedUserData } = useAccess();

  useEffect(() => {
    setPopup({ title: "Age verification", component: "verify-age" });
    onGetLoggedUserData();

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (screen?.orientation?.lock) {
      screen.orientation.lock("portrait").catch((err) => {
        console.warn("Unable to lock orientation :", err);
      });
    }

    return () => {
      if (screen?.orientation?.unlock) {
        screen.orientation.unlock();
      }
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <div id="body-inner">
      <LeftNavBar />
      <ScrollContentContextProvider>
        <ProfileContextProvider>
          <Outlet />
          <Menu />
        </ProfileContextProvider>
      </ScrollContentContextProvider>
      <RightNavBar />
      <Header />
      <MobileNavBar originPage={"Home"} />
      <Popup />
      <SearchSection />
    </div>
  );
}
