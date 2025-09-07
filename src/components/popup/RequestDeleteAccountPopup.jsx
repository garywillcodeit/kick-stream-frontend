import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import PasswordInput from "../inputs/PasswordInput";
import { postRequest } from "../../utils/requests/serverRequests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError.js";

export default function RequestDeleteAccountPopup() {
  const { userData, setUserData, resetPopup, setPopup } =
    useContext(AppContexts);
  const navigate = useNavigate();
  const { errorHandler } = useError();

  const onChange = (e) => {
    setUserData((p) => ({ ...p, password: e.target.value }));
  };

  const onCancelDeletion = () => {
    setUserData((p) => ({ ...p, password: "" }));
    toast.success("Your choice has been successfully registered.");
    resetPopup();
    navigate("/");
  };

  const onDeleteAccount = async () => {
    const { password } = userData;

    try {
      await postRequest("/user/request-delete-account", { password });

      setPopup({
        component: "confirm-delete-account",
        title: "Validation code",
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="popup common-popup">
      <p>Please note: this action is final.</p>
      <PasswordInput
        placeholder={"Confirm with your password"}
        name={"password"}
        value={userData.password}
        onChange={onChange}
      />
      <button className="button delete-btn" onClick={onCancelDeletion}>
        I cancel the deletion
      </button>
      <button className="button unhighlighted" onClick={onDeleteAccount}>
        I delete my account
      </button>
    </div>
  );
}
