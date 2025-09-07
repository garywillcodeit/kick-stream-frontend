import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError.js";

export default function ForgotPasswordPopup() {
  const { userData, setUserData, resetPopup } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value.toLowerCase() }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email } = userData;
    const request = postRequest("/auth/reset-password-req", { email });

    await toast.promise(request, {
      loading: "Requesting password reset...",
      success: ({ data }) => {
        resetPopup();
        return data.msg;
      },
      error: (error) => errorHandler(error),
    });
  };

  return (
    <div className="popup common-popup">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          className="input-text"
          placeholder="Write your email address"
          value={userData.email}
          onChange={onChange}
        />
        <input type="submit" value="I reset my password" className="button" />
      </form>
    </div>
  );
}
