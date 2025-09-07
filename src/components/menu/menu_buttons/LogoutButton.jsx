import React from "react";
import LogoutIcon from "../../../assets/img/icons/LogoutIcon";
import useAccess from "../../../hooks/useAccess.js";

export default function LogoutButton({ fromAll }) {
  const { onLogout } = useAccess();

  return (
    <li>
      <button onClick={() => onLogout(fromAll)} className="logout">
        <LogoutIcon />
        {fromAll ? "Logout from all devices" : "Logout"}
      </button>
    </li>
  );
}
