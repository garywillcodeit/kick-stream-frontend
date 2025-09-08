import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContexts } from "../../contexts/AppContext";
import HomeIcon from "../../assets/img/icons/HomeIcon";
import SearchIcon from "../../assets/img/icons/SearchIcon";
import LikeFullIcon from "../../assets/img/icons/LikeFullIcon";
import AccountIcon from "../../assets/img/icons/AccountIcon";
import MailIcon from "../../assets/img/icons/MailIcon";
import MaskIcon from "../../assets/img/icons/MaskIcon";
import DocumentIcon from "../../assets/img/icons/DocumentIcon";
import LogoutIcon from "../../assets/img/icons/LogoutIcon";
import useAccess from "../../hooks/useAccess.js";
import SettingIcon from "../../assets/img/icons/SettingIcon";
import useNavBtnActivation from "../../hooks/useNavBtnActivation.js";
import AddIcon from "../../assets/img/icons/AddIcon";
import useContentUploader from "../../hooks/useContentUploader.js";
import Picture from "../Picture.jsx";

export default function LeftNavBar() {
  const { activeBtn, resetMenuData, userData } = useContext(AppContexts);
  const { onLogout } = useAccess();
  const { onAddContent, onLabelClick } = useContentUploader();

  useNavBtnActivation();

  return (
    <nav className="nav-laptop">
      <img src="/img/logo/logo.webp" alt="Website logo" className="logo" />

      <div className="nav-btn-wrapper">
        <Link
          to={"/"}
          className={`nav-btn ${activeBtn.home ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <HomeIcon />
          <p>Feed</p>
        </Link>
        <Link
          to={"/discover"}
          className={`nav-btn ${activeBtn.discover ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <SearchIcon />
          <p>Discover</p>
        </Link>
        <Link
          to={"/my-likes"}
          className={`nav-btn ${activeBtn.likes ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <LikeFullIcon />
          <p>My likes</p>
        </Link>
        <Link
          to={"/contact-us"}
          className={`nav-btn ${activeBtn.contact ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <MailIcon />
          <p>Contact</p>
        </Link>
        <Link
          to={"/terms-of-use"}
          className={`nav-btn ${activeBtn.tos ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <DocumentIcon />
          <p>Terms of use</p>
        </Link>
        <Link
          to={"/privacy-policy"}
          className={`nav-btn ${activeBtn.privacy ? "active" : ""}`}
          onClick={resetMenuData}
        >
          <MaskIcon />
          <p>Privacy policy</p>
        </Link>
        {userData.isLogged ? (
          <>
            <Link
              to={`/@${userData.username}`}
              className={`nav-btn ${activeBtn.profile ? "active" : ""}`}
              onClick={resetMenuData}
            >
              <Picture urls={userData.avatarUrls} alt={"Avatar"} />
              <p>My profile</p>
            </Link>
            <input
              type="file"
              name="content"
              id="left-nav-add-content"
              className="disp-n"
              accept="video/mp4, video/quicktime"
              onChange={onAddContent}
            />
            <label
              htmlFor="left-nav-add-content"
              className="nav-btn curs-p"
              onClick={onLabelClick}
            >
              <AddIcon />
              <p>Upload a video</p>
            </label>
            <Link
              to={"/settings"}
              className={`nav-btn ${activeBtn.settings ? "active" : ""}`}
              onClick={resetMenuData}
            >
              <SettingIcon />
              <p>Settings</p>
            </Link>
            <button className={`nav-btn logout`} onClick={onLogout}>
              <LogoutIcon />
              <p>Logout</p>
            </button>
          </>
        ) : (
          <Link
            to={"/login"}
            className={`nav-btn ${activeBtn.login ? "active" : ""}`}
            onClick={resetMenuData}
          >
            <AccountIcon />
            <p>{userData.isLogged ? "Settings" : "Login"}</p>
          </Link>
        )}
      </div>
      <p className="copyright">{`Copyright © ${new Date().getFullYear()} KickStream`}</p>
    </nav>
  );
}
