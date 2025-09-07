import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError.js";

export default function ValidationEmailUpdatePopup() {
  const { userData, setUserData, resetPopup } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { newEmail, validationCode } = userData;
    const loadToast = toast.loading("Updating email...");

    try {
      const path = "/user/validation-email-update";
      const { data } = await postRequest(path, { newEmail, validationCode });

      setUserData((p) => ({
        ...p,
        ...data.userData,
        newEmail: "",
        password: "",
        validationCode: "",
      }));
      resetPopup();

      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return (
    <div className="popup common-popup">
      <p>
        Previous email : <span>{userData.email}</span>
      </p>
      <p>
        New email : <span>{userData.newEmail}</span>
      </p>

      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          name="validationCode"
          className="input-text"
          placeholder="Validation code"
          value={userData.validationCode || ""}
          onChange={onChange}
        />
        <input type="submit" value="Verify code" className="button" />
      </form>
    </div>
  );
}
