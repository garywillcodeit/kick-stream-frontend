import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import SaveIcon from "../../assets/img/icons/SaveIcon.jsx";
import UploadIcon from "../../assets/img/icons/UploadIcon.jsx";
import Picture from "../Picture.jsx";
import useInputChange from "../../hooks/useInputChange.js";
import useContentUploader from "../../hooks/useContentUploader.js";

export default function ChangeAvatarPopup() {
  const { userData } = useContext(AppContexts);
  const [imageUrls, setImageUrls] = useState({});
  const { onChangeAvatar } = useInputChange();
  const { onUploadNewAvatar } = useContentUploader();

  useEffect(() => {
    if (userData.avatarUrlFromFile) {
      setImageUrls({ upload: userData.avatarUrlFromFile });
    } else if (userData.avatarUrls) {
      setImageUrls(userData.avatarUrls);
    } else {
      setImageUrls({});
    }
  }, [userData]);

  return (
    <div className="popup new-avatar-popup">
      <div className="avatar-square">
        <Picture urls={imageUrls} alt={"Avatar"} />
      </div>
      <div className="btn-wrapper">
        <input
          id="file"
          type="file"
          accept=".jpg, .webp, .jpeg, .png, .avif"
          className="button disp-n"
          onChange={onChangeAvatar}
        />
        <label htmlFor="file" className="button first-btn">
          <UploadIcon />
          Upload
        </label>
        {userData?.avatar?.name && (
          <button
            className="button first-btn"
            onClick={() => onUploadNewAvatar(true)}
          >
            <SaveIcon />
            Save
          </button>
        )}
      </div>
    </div>
  );
}
