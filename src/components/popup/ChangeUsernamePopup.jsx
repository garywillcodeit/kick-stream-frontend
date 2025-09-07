import React, { useState } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { putRequest } from "../../utils/requests/serverRequests";
import TextInput from "../inputs/TextInput";
import useError from "../../hooks/useError.js";
import {
  changeNewUsernameValidator,
  submitNewUsernameValidator,
} from "../../utils/validators/newUsernameValidator.js";

export default function ChangeUsernamePopup() {
  const { userData, setUserData, resetPopup } = useContext(AppContexts);
  const [message, setMessage] = useState("");
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;

    let error = changeNewUsernameValidator(value, userData.username);

    setMessage(error);

    setUserData((p) => ({ ...p, [name]: value.toLowerCase() }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { newUsername } = userData;
    const loadToast = toast.loading("Updating username...");

    try {
      submitNewUsernameValidator(userData);

      const { data } = await putRequest("/user/username", { newUsername });

      setUserData((p) => ({
        ...p,
        ...data.userData,
        newUsername: "",
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
        Previous username : <span>{userData.username}</span>
      </p>

      <form onSubmit={onSubmit}>
        <TextInput
          name={"newUsername"}
          placeholder={"New username"}
          onChange={onChange}
          value={userData.newUsername || ""}
          message={message}
        />
        <input type="submit" value="Change Username" className="button" />
      </form>
    </div>
  );
}
