import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { postRequest, putRequest } from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError.js";

export default function ValidationPasswordUpdatePopup() {
  const { userData, setUserData, resetPopup } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { validationCode } = userData;
    const loadToast = toast.loading("Updating password...");

    try {
      const path = "/user/validation-password-update";
      const { data } = await postRequest(path, { validationCode });

      setUserData((p) => ({
        ...p,
        password: "",
        newPassword: "",
        validationCode: "",
      }));

      toast.success(data.msg);

      resetPopup();
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return (
    <div className="popup common-popup">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          name="validationCode"
          className="input-text"
          placeholder="Enter the validation code"
          value={userData.validationCode || ""}
          onChange={onChange}
        />
        <input type="submit" value="Verify code" className="button" />
      </form>
    </div>
  );
}
