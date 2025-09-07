import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContexts } from "../../../contexts/AppContext";
import MailIcon from "../../../assets/img/icons/MailIcon";

export default function ContactUsButton() {
  const navigate = useNavigate();
  const { resetMenuData } = useContext(AppContexts);

  const onContact = () => {
    resetMenuData();
    navigate("/contact-us");
  };
  return (
    <>
      {window.innerWidth <= 600 && (
        <li>
          <button onClick={onContact}>
            <MailIcon />
            Contact us
          </button>
        </li>
      )}
    </>
  );
}
