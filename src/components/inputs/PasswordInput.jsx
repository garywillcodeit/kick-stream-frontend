import React from "react";
import { useState } from "react";
import EyeCloseIcon from "../../assets/img/icons/EyeCloseIcon";
import EyeOpenIcon from "../../assets/img/icons/EyeOpenIcon";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";

export default function PasswordInput({
  placeholder,
  name,
  value,
  onChange,
  activeForgot,
  onKeyDown,
  inputTitle,
}) {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { setPopup } = useContext(AppContexts);

  const onShowHidePassword = () => setVisiblePassword((p) => !p);

  const onResetPassword = (e) => {
    e.preventDefault();

    setPopup({ title: "Forgot password", component: "forgot-password" });
  };

  return (
    <div className="input-container">
      <p className="input-name">{inputTitle || "Password"}</p>
      <div className="input-text password-input">
        <input
          type={visiblePassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <div className="icon-wrapper" onClick={onShowHidePassword}>
          {visiblePassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </div>
      </div>
      {activeForgot && (
        <button onClick={onResetPassword} className="forgot-password">
          Forgot password
        </button>
      )}
    </div>
  );
}
