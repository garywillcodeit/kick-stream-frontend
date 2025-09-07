import React from "react";
import PasswordInput from "../inputs/PasswordInput";
import { postRequest, putRequest } from "../../utils/requests/serverRequests";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import useError from "../../hooks/useError.js";

export default function ChangePasswordPopup() {
  const { userData, setUserData, setPopup } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { password, newPassword } = userData;
    const loadingToast = toast.loading("Requesting password update..");

    try {
      await postRequest("/user/request-password-update", {
        password,
        newPassword,
      });

      setPopup({
        component: "validation-password-update",
        title: "Validation code",
      });

      toast.dismiss(loadingToast);
    } catch (error) {
      toast.remove();
      errorHandler(error);
    }
  };

  return (
    <div className="popup common-popup">
      <form action="" onSubmit={onSubmit}>
        <PasswordInput
          name={"password"}
          value={userData.password}
          onChange={onChange}
          inputTitle={"Current password"}
        />
        <PasswordInput
          name={"newPassword"}
          value={userData.newPassword || ""}
          onChange={onChange}
          inputTitle={"New password"}
        />
        <input type="submit" value="Change password" className="button" />
      </form>
    </div>
  );
}
