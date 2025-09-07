import React, { createContext, useEffect, useRef, useState } from "react";
import { getRequest } from "../../../utils/requests/serverRequests.js";
import FirstLoginSteps from "../../steps/FirstLoginSteps.jsx";
import DefineUsername from "./DefineUsername.jsx";
import DefineAvatar from "./DefineAvatar.jsx";
import DefineCategories from "./DefineCategories.jsx";
import useCategories from "../../../hooks/useCategories.js";

export const FirstLoginContext = createContext();

export default function FirstLoginPopup() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const { initCategories } = useCategories();

  const scrollRef = useRef(null);

  useEffect(() => {
    getRequest("/user/first-login/categories").then(({ data }) => {
      initCategories(data);
    });
  }, []);

  return (
    <FirstLoginContext.Provider
      value={{
        step,
        setStep,
        scrollRef,
        error,
        setError,
        state,
        setState,
      }}
    >
      <FirstLoginSteps step={step} setStep={setStep} />
      <div ref={scrollRef} className="popup common-popup first-login-popup">
        <DefineUsername />
        <DefineAvatar />
        <DefineCategories />
      </div>
    </FirstLoginContext.Provider>
  );
}
