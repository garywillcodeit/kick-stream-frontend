import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContexts } from "../../../contexts/AppContext";
import DocumentIcon from "../../../assets/img/icons/DocumentIcon";

export default function TermOsUseButton() {
  const navigate = useNavigate();
  const { resetMenuData } = useContext(AppContexts);

  const onContact = () => {
    resetMenuData();
    navigate("/terms-of-use");
  };
  return (
    <>
      {window.innerWidth <= 600 && (
        <li>
          <button onClick={onContact}>
            <DocumentIcon />
            Terms on use
          </button>
        </li>
      )}
    </>
  );
}
