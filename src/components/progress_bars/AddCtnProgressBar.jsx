import React, { useContext, useEffect, useRef } from "react";
import { AddEditContentContext } from "../../contexts/AddEditContentContext";

export default function AddCtnProgressBar() {
  const { step, progressBar, setProgressBar } = useContext(
    AddEditContentContext
  );

  const progressBarRef = useRef(null);

  useEffect(() => {
    if (step === 1) {
      setProgressBar(0);
    }
  }, [step]);

  return (
    <div ref={progressBarRef} className="progress-bar add-content">
      <div style={{ width: progressBar + "%" }} className="read-part"></div>
    </div>
  );
}
