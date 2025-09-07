import { useContext } from "react";
import { changeAvatarValidator } from "../utils/validators/accountPageValidator";
import { AppContexts } from "../contexts/AppContext";
import useError from "./useError";

export default function useInputChange() {
  const { setUserData, isUploadAllowed } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onChangeAvatar = async (e) => {
    const file = e.target.files[0];
    try {
      await changeAvatarValidator(file, isUploadAllowed);
      setUserData((p) => ({
        ...p,
        avatar: file,
        avatarUrlFromFile: URL.createObjectURL(file),
      }));
    } catch (error) {
      errorHandler(error);
    } finally {
      e.target.value = "";
    }
  };

  return {
    onChangeAvatar,
  };
}
