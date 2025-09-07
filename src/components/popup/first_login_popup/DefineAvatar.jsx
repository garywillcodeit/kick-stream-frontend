import React, { useContext } from "react";
import Picture from "../../Picture";
import { AppContexts } from "../../../contexts/AppContext";
import useInputChange from "../../../hooks/useInputChange";
import UploadIcon from "../../../assets/img/icons/UploadIcon";

export default function DefineAvatar() {
  const { userData } = useContext(AppContexts);
  const { onChangeAvatar } = useInputChange();

  return (
    <div className="define-avatar new-avatar-popup">
      <p className="description">Choose a profile picture</p>
      <div className="avatar-square">
        <Picture urls={{ upload: userData.avatarUrlFromFile }} alt={"Avatar"} />
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
          Select an image
        </label>
      </div>
    </div>
  );
}
