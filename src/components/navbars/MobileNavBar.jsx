import React from "react";
import HomeIcon from "../../assets/img/icons/HomeIcon";
import SearchIcon from "../../assets/img/icons/SearchIcon";
import LikeFullIcon from "../../assets/img/icons/LikeFullIcon";
import AccountIcon from "../../assets/img/icons/AccountIcon";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import useNavBtnActivation from "../../hooks/useNavBtnActivation.js";
import AddIcon from "../../assets/img/icons/AddIcon";
import useContentUploader from "../../hooks/useContentUploader.js";
import Picture from "../Picture.jsx";

export default function MobileNavBar() {
  const { menuData, popup, searching, activeBtn, userData, isPWAOnIOS } =
    useContext(AppContexts);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { onAddContent, onLabelClick } = useContentUploader();

  useNavBtnActivation();

  const onGoToHome = () => {
    if (pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      {!searching && (
        <nav
          className={`nav-mobile ${isPWAOnIOS ? "pwa-mode" : ""} ${
            menuData.component || popup.component ? "disabled" : ""
          }`}
        >
          <button onClick={onGoToHome}>
            <HomeIcon className={activeBtn.home ? "active" : ""} />
            <span className="active-bar"></span>
          </button>
          <button onClick={() => navigate("/discover")}>
            <SearchIcon className={activeBtn.discover ? "active" : ""} />
          </button>
          <input
            type="file"
            name="content"
            id="left-nav-add-content-mobile-nav"
            className="disp-n"
            accept="video/mp4,video/quicktime"
            onChange={onAddContent}
          />
          <label
            htmlFor="left-nav-add-content-mobile-nav"
            onClick={onLabelClick}
          >
            <AddIcon className={activeBtn.addContent ? "active" : ""} />
          </label>
          <button onClick={() => navigate("/my-likes")}>
            <LikeFullIcon className={activeBtn.likes ? "active" : ""} />
          </button>
          {userData.isLogged ? (
            <button onClick={() => navigate(`/@${userData.username}`)}>
              <Picture
                urls={userData.avatarUrls}
                alt={"Avatar"}
                className={"mobile-nav-avatar"}
              />
            </button>
          ) : (
            <button onClick={() => navigate(`/login`)}>
              <AccountIcon className={activeBtn.account ? "active" : ""} />
            </button>
          )}
        </nav>
      )}
    </>
  );
}
