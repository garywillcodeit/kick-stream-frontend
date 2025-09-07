import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getRequest,
  postRequest,
} from "../../utils/requests/serverRequests.js";
import toast from "react-hot-toast";
import PasswordInput from "../inputs/PasswordInput.jsx";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext.jsx";
import inputChanger from "../../utils/features/inputChanger.js";
import { useState } from "react";
import LoadingBlur from "../LoadingBlur.jsx";
import useError from "../../hooks/useError.js";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const { userData, setUserData, resetUserData } = useContext(AppContexts);
  const [sectionState, setSectionState] = useState("loading");
  const { errorHandler } = useError();

  useEffect(() => {
    getRequest("/check-ticket?ticketId=" + ticketId)
      .then(() => {
        setSectionState("form");
      })
      .catch(() => {
        setSectionState("error");
      });
  }, []);

  useEffect(() => {
    if (sectionState !== "loading") {
    }
  }, [sectionState]);

  const onChange = (e) => {
    setUserData((p) => ({ ...p, ...inputChanger(e) }));
  };

  const onUpdatePassword = async () => {
    const { password, confirmPassword } = userData;

    const path = "/auth/reset-password-confirm/" + ticketId;
    const request = postRequest(path, { password, confirmPassword });

    await toast.promise(request, {
      loading: "Reset in progress...",
      success: ({ data }) => {
        resetUserData();
        navigate("/login");
        return data.msg;
      },
      error: (error) => errorHandler(error),
    });
  };

  return (
    <>
      {sectionState === "loading" ? (
        <>
          <LoadingBlur />
        </>
      ) : (
        <section className="section access-section">
          <div className="inner-wrapper">
            {sectionState === "form" && (
              <>
                <h1>Reset your password</h1>
                <PasswordInput
                  placeholder={"New password"}
                  name={"password"}
                  value={userData.password}
                  onChange={onChange}
                />
                <PasswordInput
                  placeholder={"Confirm password"}
                  inputTitle={"Confirm password"}
                  name={"confirmPassword"}
                  value={userData.confirmPassword || ""}
                  onChange={onChange}
                />

                <button
                  className="button submit-btn"
                  onClick={onUpdatePassword}
                >
                  I update my password
                </button>
              </>
            )}
            {sectionState === "error" && (
              <>
                <h1>Oups !</h1>
                <p>It seems like this request does not exist anymore.</p>

                <Link to={"/login"} className="button submit-btn">
                  Back to login
                </Link>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
