import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/requests/serverRequests";
import { AppContexts } from "../../contexts/AppContext";
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lotties/loading.json";
import blackLoadingLottie from "../../assets/lotties/blackLoading.json";
import OptionsIcon from "../../assets/img/icons/OptionsIcon";
import useError from "../../hooks/useError";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function FollowEditButton() {
  const { userData, activeMenu } = useContext(AppContexts);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const { errorHandler } = useError();

  const onFollow = async () => {
    setIsFollowing(true);
    try {
      const { data } = await postRequest(
        "/user/follow/" + profileData.username
      );
      setProfileData((p) => ({ ...p, isFollowed: data.isFollowed }));
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsFollowing(false);
    }
  };

  const onOpenOptions = () => {
    activeMenu({ title: "Options", component: "common" });
  };

  return (
    <>
      {profileData.username === userData.username ? (
        <div className="follow-btn-wrapper">
          <button
            className={`button follow-btn followed`}
            onClick={() => navigate("/settings")}
          >
            Edit profile
          </button>
          <button className="options" onClick={onOpenOptions}>
            <OptionsIcon />
          </button>
        </div>
      ) : (
        <div className="follow-btn-wrapper">
          <button
            className={`button follow-btn ${
              profileData.isFollowed ? "followed" : ""
            }`}
            onClick={onFollow}
          >
            {profileData.isFollowed ? "Followed" : "Follow"}
            {isFollowing && (
              <Lottie
                animationData={
                  profileData.isFollowed ? loadingLottie : blackLoadingLottie
                }
                loop
                className={`loading-lottie ${
                  profileData.isFollowed ? "" : "follow-color"
                }`}
              />
            )}
          </button>
          <button className="options" onClick={onOpenOptions}>
            <OptionsIcon />
          </button>
        </div>
      )}
    </>
  );
}
