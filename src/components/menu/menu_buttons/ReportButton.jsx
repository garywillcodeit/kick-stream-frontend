import React, { useContext } from "react";
import ReportIcon from "../../../assets/img/icons/ReportIcon";
import { AppContexts } from "../../../contexts/AppContext";

export default function ReportButton({ type, itemId }) {
  const { activeMenu, userData, setPopup, resetMenuData } =
    useContext(AppContexts);

  const onReport = () => {
    if (userData.isLogged) {
      activeMenu({
        component: "report",
        title: "Report",
        type,
        itemId,
      });
    } else {
      resetMenuData();
      setPopup({
        title: "Login",
        component: "login-required",
        description: `You must be logged in to report a ${type}.`,
      });
    }
  };

  return (
    <li>
      <button onClick={onReport}>
        <ReportIcon />
        Report
      </button>
    </li>
  );
}
