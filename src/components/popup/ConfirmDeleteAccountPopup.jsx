import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/requests/serverRequests";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError.js";

export default function ConfirmDeleteAccountPopup() {
  const navigate = useNavigate();
  const { userData, setUserData, resetPopup, resetUserData } =
    useContext(AppContexts);
  const { errorHandler } = useError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { validationCode } = userData;

    await toast.promise(
      postRequest("/user/confirm-delete-account", { validationCode }),
      {
        loading: "Deleting account...",
        success: ({ data }) => {
          resetUserData();
          resetPopup();
          navigate("/", {
            state: { deletedAccountContent: data.deletedAccountContent },
          });
          return data.msg;
        },
        error: (error) => errorHandler(error),
      }
    );
  };

  return (
    <div className="popup common-popup">
      <p>
        We sent you an email with a verification code in it. Enter this code
        here:
      </p>
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
