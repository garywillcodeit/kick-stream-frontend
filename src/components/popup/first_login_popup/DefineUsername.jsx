import React, { useContext, useEffect, useRef } from "react";
import TextInput from "../../inputs/TextInput";
import { FirstLoginContext } from "./FirstLoginPopup";
import { postRequest } from "../../../utils/requests/serverRequests";
import usernameValidator from "../../../utils/validators/usernameValidator";
import { AppContexts } from "../../../contexts/AppContext";

export default function DefineUsername() {
  const { state, setState, error, setError } = useContext(FirstLoginContext);
  const { userData, setUserData } = useContext(AppContexts);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (userData.newUsername) {
      timeoutRef.current = setTimeout(() => {
        setState("loading");
        postRequest("/user/username", {
          newUsername: userData.newUsername,
        }).then(({ data }) => {
          if (!data.isUsernameAvailable) {
            setError("This username is not available");
            setState("error");
          } else {
            setState("validated");
          }
        });
      }, 1000);
    }
  }, [userData.newUsername]);

  const onChange = (e) => {
    let { value } = e.target;
    setError("");

    value = value.trim().slice(0, 20).toLowerCase();

    if (value.length >= 3) {
      setState("loading");
    } else {
      setState("");
    }

    try {
      usernameValidator(value);
      setUserData((p) => ({
        ...p,
        newUsername: value,
      }));
    } catch (error) {
      setError(error.message);
      setState("error");
    }
  };

  return (
    <div className="define-username">
      <p className="description">Choose a username</p>
      <TextInput
        name={"username"}
        inputTitle={"New username"}
        maxLength={20}
        value={userData.newUsername || ""}
        onChange={onChange}
        message={error}
        stateIcon={state}
        autoComplete={"off"}
      />
    </div>
  );
}
