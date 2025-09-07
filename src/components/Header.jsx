import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { useLocation, useParams } from "react-router-dom";
import BackIcon from "../assets/img/icons/BackIcon";
import OptionsIcon from "../assets/img/icons/OptionsIcon";
import headerComponentData from "../utils/data/headerComponentData";
import SearchBar from "./SearchBar";
import SaveIcon from "../assets/img/icons/SaveIcon";
import { putRequest } from "../utils/requests/serverRequests";
import toast from "react-hot-toast";
import { contactDataValidator } from "../utils/validators/accountPageValidator";
import useError from "../hooks/useError.js";

export default function Header() {
  const inputRef = useRef();
  const { pathname } = useLocation();
  const [showHeadOpt, setShowHeadOpt] = useState(false);
  const [enableSearchBar, setEnableSearchbar] = useState(false);
  const [activeBG, setActiveBG] = useState(false);
  const { slug, username } = useParams();
  const { errorHandler } = useError();

  const {
    searching,
    setSearching,
    setSearchRef,
    setSearch,
    resetSearchResult,
    callFocusSearch,
    setCallFocusSearch,
    activeMenu,
    menuData,
    resetMenuData,
    userData,
  } = useContext(AppContexts);

  useEffect(() => {
    setSearchRef(inputRef);
  }, []);

  useEffect(() => {
    const pathToDisable = [
      "/content/",
      "/my-likes/",
      "/discover/",
      "/category/",
      `/${username}/`,
    ];
    const containsPattern = pathToDisable.some((e) => pathname.includes(e));

    if (containsPattern || pathname === "/") {
      setActiveBG(true);
    } else {
      setActiveBG(false);
    }
  }, [pathname]);

  useEffect(() => {
    for (let e of headerComponentData(username)) {
      setShowHeadOpt(false);
      setEnableSearchbar(false);
      if (pathname === e.path) {
        setEnableSearchbar(e.search);
        setShowHeadOpt(e.options);
        break;
      }
    }

    if (searching) {
      setShowHeadOpt(false);
    }
  }, [pathname, searching, username]);

  useEffect(() => {
    if (callFocusSearch) {
      inputRef.current.focus();
      setCallFocusSearch(false);
    }
  }, [callFocusSearch]);

  const onBlur = () => {
    setSearch("");
    setSearching(false);
    resetSearchResult();
  };

  const onOpenCloseMenu = () => {
    if (menuData.component) {
      resetMenuData();
    } else {
      activeMenu({ title: "Options", component: "common" });
    }
  };

  const onSaveAccountData = async () => {
    const loadToast = toast.loading("Updating account data...");
    try {
      contactDataValidator(userData);
      const { data } = await putRequest("/user/", userData);

      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return (
    <header>
      <div
        className={`inner-wrapper ${activeBG && !searching ? "no-bg" : ""} ${
          searching ? "searching" : ""
        } ${showHeadOpt ? "with-opt" : ""}`}
      >
        <button onClick={onBlur} className="logo-wrapper">
          {searching ? (
            <BackIcon className={"back-icon"} />
          ) : (
            <img src="/img/logo/logo.svg" alt="Website logo" className="logo" />
          )}
        </button>

        {enableSearchBar && <SearchBar />}
        {showHeadOpt && (
          <button className="option-btn" onClick={onOpenCloseMenu}>
            <OptionsIcon />
          </button>
        )}
        {pathname === "/settings" && (
          <button className="button save-btn" onClick={onSaveAccountData}>
            <SaveIcon />
            <p>Save</p>
          </button>
        )}
      </div>
    </header>
  );
}
