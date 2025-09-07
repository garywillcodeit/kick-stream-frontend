import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountInfosPopup() {
  const { resetPopup, setPopup } = useContext(AppContexts);
  const navigate = useNavigate();

  const onCancelDeletion = () => {
    toast.success("Your choice has been successfully registered.");
    resetPopup();
    navigate("/");
  };

  const onConfirmDeletion = () => {
    setPopup({
      component: "request-delete-account",
      title: "Confirm your password",
    });
  };

  return (
    <div className="popup common-popup">
      <h3>Are you sure?</h3>
      <p className="text-ali-cent">
        All of your interactions will be permanently lost if you delete your
        account. Do you wish to proceed?
      </p>
      <button className="button delete-btn" onClick={onCancelDeletion}>
        No, I keep the account
      </button>
      <button className="button unhighlighted" onClick={onConfirmDeletion}>
        Yes, I do
      </button>
    </div>
  );
}
