import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContexts } from "../../../contexts/AppContext";
import MaskIcon from "../../../assets/img/icons/MaskIcon";

export default function PrivacyPolicyButton() {
  const navigate = useNavigate();
  const { resetMenuData } = useContext(AppContexts);

  const onClick = () => {
    resetMenuData();
    navigate("/privacy-policy");
  };
  return (
    <>
      {window.innerWidth <= 600 && (
        <li>
          <button onClick={onClick}>
            <MaskIcon />
            Privacy Policy
          </button>
        </li>
      )}
    </>
  );
}
