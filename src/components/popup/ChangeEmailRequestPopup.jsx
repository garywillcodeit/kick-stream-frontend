import { useState } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import PasswordInput from "../inputs/PasswordInput";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/requests/serverRequests";
import TextInput from "../inputs/TextInput";
import useError from "../../hooks/useError.js";
import {
  changeNewEmailValidator,
  requestEmailUpdateValidator,
} from "../../utils/validators/newEmailValidator.js";

export default function ChangeEmailRequestPopup() {
  const { userData, setUserData, setPopup } = useContext(AppContexts);
  const [message, setMessage] = useState("");
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;

    let error = changeNewEmailValidator(value, userData.email);
    setMessage(error);

    setUserData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { newEmail, password } = userData;
    const loadingToast = toast.loading("Requesting email update...");

    try {
      requestEmailUpdateValidator(userData);

      await postRequest("/user/request-email-update", { newEmail, password });
      setPopup({
        component: "validation-email-update",
        title: "New email",
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadingToast);
    }
  };

  return (
    <div className="popup common-popup">
      <p>
        Previous email : <span>{userData.email}</span>
      </p>

      <form onSubmit={onSubmit}>
        <TextInput
          type="email"
          name="newEmail"
          inputTitle={"New email"}
          value={userData.newEmail || ""}
          onChange={onChange}
          message={message}
        />
        <PasswordInput
          name={"password"}
          value={userData.password}
          onChange={onChange}
        />
        <input type="submit" value="Change Email" className="button" />
      </form>
    </div>
  );
}
