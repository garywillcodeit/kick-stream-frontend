import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { getRequest } from "../utils/requests/serverRequests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useError from "./useError.js";

export default function useAccess() {
  const {
    setUserData,
    resetUserData,
    resetMenuData,
    setIsCheckingLoggedUser,
    setIsUploadAllowed,
    resetPopup,
  } = useContext(AppContexts);
  const navigate = useNavigate();
  const { errorHandler } = useError();

  const onGetLoggedUserData = () => {
    setIsCheckingLoggedUser(true);
    getRequest("/init")
      .then(({ data }) => {
        setUserData((p) => ({ ...p, ...data.user, isFetching: false }));
        setIsUploadAllowed(data.isUploadAllowed);
      })
      .finally(() => setIsCheckingLoggedUser(false));
  };

  const onLogout = async (fromAll) => {
    let path = "/auth/logout";
    if (fromAll) {
      path += "/all";
    }

    await toast.promise(getRequest(path), {
      loading: "Logging out...",
      success: ({ data }) => {
        resetUserData();
        resetMenuData();
        resetPopup();
        navigate("/login");
        return data.msg;
      },
      error: (error) => errorHandler(error),
    });
  };

  return { onGetLoggedUserData, onLogout };
}
