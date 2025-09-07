import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext.jsx";
import AccessForm from "../AccessForm.jsx";

export default function LoginRequiredPopup() {
  const { popup } = useContext(AppContexts);

  return (
    <div className="popup common-popup">
      <p className="description">{popup.description}</p>
      <AccessForm accessType={"login"} />
    </div>
  );
}
