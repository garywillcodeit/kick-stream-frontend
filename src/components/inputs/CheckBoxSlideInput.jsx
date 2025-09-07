import React from "react";

export default function CheckBoxSlideInput({ id, name, value, onChange }) {
  return (
    <div className="slide-checkbox-wrapper">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id} className={`${value && "active"}`}></label>
    </div>
  );
}
