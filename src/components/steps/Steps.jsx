import React from "react";

export default function Steps({ type, step, onPrevious, onNext }) {
  return (
    <div className="steps-btn-wrapper">
      <div className="step-button">
        <button className="back-button" onClick={onPrevious}>
          {type === "first-login" ? "Pass" : step > 1 ? "Back" : "Cancel"}
        </button>
        <button className="button" onClick={onNext}>
          {type === "first-login" ? "Save" : step < 3 ? "Next" : "Upload"}
        </button>
      </div>
      <div className="steps-wrapper">
        <div className="inner">
          <div className={step >= 1 ? "active" : ""}></div>
          <div className={step >= 2 ? "active" : ""}></div>
          <div className={step === 3 ? "active" : ""}></div>
        </div>
      </div>
    </div>
  );
}
