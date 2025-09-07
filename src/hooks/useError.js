import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContexts } from "../contexts/AppContext";
import errorManager from "../utils/errors/errorManager";

export default function useError() {
  const navigate = useNavigate();
  const {
    userData,
    resetUserData,
    setUserData,
    setIsUploadAllowed,
    resetPopup,
  } = useContext(AppContexts);
  const { pathname } = useLocation();

  const errorHandler = (error) => {
    if (["development", "test"].includes(import.meta.env.VITE_ENV)) {
      console.log(error);
    }

    if (error?.response?.data) {
      const {
        isTempSuspended,
        isPermSuspended,
        isCommentLimited,
        isCommentSpammer,
        isUploadAllowed,
        isUnauthorizedAccess,
        isUploadLimitReached,
      } = error.response.data;
      if (isTempSuspended || isPermSuspended || isUnauthorizedAccess) {
        resetUserData();

        if (pathname === "/login") {
          errorManager(error);
        } else if (["/add-content", "/settings"].includes(pathname)) {
          errorManager(error);
          const type = isTempSuspended ? "temp" : "perm";
          navigate(`/login?${type}-suspension=true`);
        }
      } else if (isCommentLimited || isCommentSpammer) {
        setUserData((p) => ({
          ...p,
          isCommentLimited,
          isCommentSpammer,
        }));
        errorManager(error);
      } else if (isUploadLimitReached) {
        errorManager(error);

        navigate("/@" + userData.username);
      } else if (![null, undefined].includes(isUploadAllowed)) {
        setIsUploadAllowed(isUploadAllowed);
        errorManager(error);
        resetPopup();
      } else {
        errorManager(error);
      }
    } else {
      errorManager(error);
    }
  };

  return { errorHandler };
}
