import React from "react";
import CheckIcon from "../../assets/img/icons/CheckIcon";
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lotties/loading.json";
import ThickCloseIcon from "../../assets/img/icons/ThickCloseIcon";

export default function TextInput({
  value,
  onChange,
  name,
  placeholder,
  message,
  inputTitle,
  maxLength,
  stateIcon,
  autoComplete,
  type = "text",
}) {
  return (
    <div className="input-container">
      <p className="input-name">{inputTitle}</p>
      <div
        className="input-text-component inputtext"
        style={message || maxLength ? { marginBottom: "20px" } : {}}
      >
        <input
          autoFocus
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete || ""}
        />
        {stateIcon === "loading" && (
          <Lottie animationData={loadingLottie} loop className="lottie" />
        )}
        {stateIcon === "validated" && <CheckIcon style={{ fill: "green" }} />}
        {stateIcon === "error" && <ThickCloseIcon style={{ fill: "red" }} />}
      </div>

      {(message || maxLength) && (
        <p className={`${message ? "error" : "max-length"} `}>
          {message ? message : `${value.length}/${maxLength}`}
        </p>
      )}
    </div>
  );
}
