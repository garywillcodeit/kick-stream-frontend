import { uploadVideoValidator } from "../utils/validators/uploadVideoValidator";
import { useLocation, useNavigate } from "react-router-dom";
import useError from "./useError.js";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext.jsx";
import toast from "react-hot-toast";
import { changeAvatarValidator } from "../utils/validators/accountPageValidator.js";
import { putRequest } from "../utils/requests/serverRequests.js";
import axios from "axios";

export default function useContentUploader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { errorHandler } = useError();
  const { isUploadAllowed, userData, setPopup, setUserData, resetPopup } =
    useContext(AppContexts);

  const onAddContent = async (e) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      let file = files[0];

      try {
        await uploadVideoValidator(file, isUploadAllowed, userData);
        navigate("/add-content", { state: { file, previousPath: pathname } });
      } catch (error) {
        errorHandler(error);
      } finally {
        e.target.value = "";
      }
    }
  };

  const onLabelClick = (e) => {
    if (!isUploadAllowed) {
      e.preventDefault();
      toast.error("Video upload is not allowed for the moment.");
    } else if (!userData.isLogged) {
      e.preventDefault();
      setPopup({
        title: "Login",
        component: "login-required",
        description: "You must be logged in to upload a video.",
      });
    }
  };

  const onUploadNewAvatar = async (closePopup = false) => {
    const loadToast = toast.loading("Updating profile picture...");
    let res = {};
    try {
      const mimetype = await changeAvatarValidator(
        userData.avatar,
        isUploadAllowed
      );
      const body = { size: userData.avatar.size, type: mimetype };
      res = await putRequest("/upload/avatar/new", body);

      const { uploadUrl } = res.data;

      if (!uploadUrl) {
        throw new Error("Unable to upload the avatar. Please, retry later.");
      }

      await axios.put(uploadUrl, userData.avatar, {
        headers: { "Content-Type": mimetype },
      });

      const { data } = await putRequest("/upload/avatar/switch-status");

      setUserData((p) => ({ ...p, avatar: {} }));
      toast.success(data.msg);

      if (closePopup) {
        resetPopup();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return { onAddContent, onLabelClick, onUploadNewAvatar };
}
