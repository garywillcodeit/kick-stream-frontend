import React, { useContext } from "react";
import useError from "../../../hooks/useError.js";
import toast from "react-hot-toast";
import {
  getRequest,
  postRequest,
} from "../../../utils/requests/serverRequests";
import { AppContexts } from "../../../contexts/AppContext";
import { ProfileContext } from "../../../contexts/ProfileContext.jsx";
import RefreshIcon from "../../../assets/img/icons/RefreshIcon.jsx";
import { useLocation, useParams } from "react-router-dom";

export default function RefreshButton() {
  const {
    resetMenuData,
    setDiscoverContentList,
    setLikesContentList,
    setTermsOfUse,
    setPrivacyPolicy,
    setUserData,
    resetUserData,
  } = useContext(AppContexts);
  const { setProfileData } = useContext(ProfileContext);
  const { errorHandler } = useError();
  const { pathname } = useLocation();
  const { username } = useParams();

  const onDelete = async () => {
    let loadToast;
    let res;

    try {
      switch (true) {
        case pathname === "/discover":
          loadToast = toast.loading("Refreshing contents...");
          res = await postRequest("/content/discover");
          setDiscoverContentList(res.data);
          break;

        case pathname === "/my-likes":
          loadToast = toast.loading("Refreshing liked contents...");
          res = await postRequest("/content/likes");
          setLikesContentList(res.data);
          break;

        case pathname === `/${username}`:
          loadToast = toast.loading("Refreshing profile data...");
          res = await getRequest("/profile/" + username);
          setProfileData(res.data);
          break;

        case pathname === "/terms-of-use":
          loadToast = toast.loading("Refreshing terms of use...");
          res = await getRequest("/document/terms-of-use");
          setTermsOfUse(res.data);
          break;

        case pathname === "/privacy-policy":
          loadToast = toast.loading("Refreshing privacy policy...");
          res = await getRequest("/document/privacy-policy");
          setPrivacyPolicy(res.data);
          break;

        case pathname === `/settings`:
          loadToast = toast.loading("Refreshing your data...");
          res = await getRequest("/user");
          if (res.data.isLogged) {
            setUserData(res.data);
          } else {
            resetUserData();
          }
          break;
      }

      toast.dismiss(loadToast);
      resetMenuData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <li>
      <button onClick={onDelete}>
        <RefreshIcon />
        Refresh
      </button>
    </li>
  );
}
