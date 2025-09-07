import React, { useContext } from "react";
import Picture from "./Picture";
import { AppContexts } from "../contexts/AppContext";
import useError from "../hooks/useError";
import { postRequest } from "../utils/requests/serverRequests";
import { useNavigate } from "react-router-dom";

export default function FollowCard({ user, className }) {
  const { setContentList, userData, setPopup } = useContext(AppContexts);
  const { errorHandler } = useError();
  const navigate = useNavigate();

  const onFollow = async () => {
    if (!userData.isLogged) {
      setPopup({
        title: "Login",
        component: "login-required",
        description: "You must be logged in to follow an account.",
      });
    } else {
      try {
        const { data } = await postRequest("/user/follow/" + user.username);

        setContentList((p) =>
          p.map((e) => {
            if (e.user.username === user.username) {
              e.user.isFollowed = data.isFollowed;
            }
            return e;
          })
        );
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const onGoToProfile = () => navigate("/@" + user.username);

  return (
    <div className={`follow-card ${className}`}>
      <Picture
        urls={user?.avatarUrls}
        alt={"Avatar"}
        onClick={() => onGoToProfile()}
      />
      <p onClick={() => onGoToProfile()}>{"@" + user?.username}</p>
      {!user?.isFollowed && user.username !== userData.username && (
        <button onClick={onFollow}>Follow</button>
      )}
    </div>
  );
}
