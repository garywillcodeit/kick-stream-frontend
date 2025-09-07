import React, { useEffect, useState } from "react";

export default function TextArea({
  value,
  onChange,
  name,
  placeholder,
  message,
  inputTitle,
  maxLength,
  className,
  style,
}) {
  const [msgStyle, setMsgStyle] = useState({});

  useEffect(() => {
    if (message) {
      setMsgStyle({ marginBottom: "20px" });
    } else {
      setMsgStyle({});
    }
  }, [message]);

  return (
    <div
      className={`input-container ${className}`}
      style={{ ...msgStyle, ...style }}
    >
      <p className="input-name">{inputTitle}</p>
      <div
        className={`input-text-component textarea ${
          maxLength ? "with-counter" : ""
        }`}
      >
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        ></textarea>
        {maxLength && (
          <p className="counter">{`${value?.length || 0}/${
            maxLength || 200
          }`}</p>
        )}
      </div>
      <p className={message ? "error" : ""}>{message}</p>
    </div>
  );
}
