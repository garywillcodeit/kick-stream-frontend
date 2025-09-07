import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import inputChanger from "../utils/features/inputChanger";
import toast from "react-hot-toast";
import { postRequest } from "../utils/requests/serverRequests";
import CheckIcon from "../assets/img/icons/CheckIcon";
import PasswordInput from "./inputs/PasswordInput";
import accessFormValidator from "../utils/validators/accessFormValidator";
import { getCalendarDays, months, years } from "../utils/features/calendar";
import useError from "../hooks/useError.js";

export default function AccessForm({ accessType }) {
  const navigate = useNavigate();
  const { userData, setUserData, resetUserData, resetPopup, setPopup } =
    useContext(AppContexts);
  const [calendarDays, setCalendarDays] = useState([]);
  const { errorHandler } = useError();

  useEffect(() => {
    setCalendarDays(getCalendarDays());
  }, []);

  const onChange = (e) => {
    setUserData((p) => ({ ...p, ...inputChanger(e) }));
  };

  const onChangeDateBirth = (e) => {
    let { name, value } = e.target;
    let date;

    switch (name) {
      case "year":
        date = userData.dateOfBirth.setYear(value);
        break;
      case "month":
        date = userData.dateOfBirth.setMonth(parseInt(value) - 1);
        break;
      case "day":
        date = userData.dateOfBirth.setDate(value);
        break;
    }

    date = new Date(date);

    setUserData((p) => ({ ...p, dateOfBirth: date }));

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    setCalendarDays(getCalendarDays(month, year));
  };

  const onAccess = async (e) => {
    if (e) e.preventDefault();

    const loadMsg =
      accessType === "login" ? "Logging in..." : "Creating account...";

    const loadToast = toast.loading(loadMsg);

    try {
      accessFormValidator(userData, accessType);

      const { data } = await postRequest("/auth/" + accessType, userData);

      if (data.userData.verifiedAccount) {
        if (data.userData.isFirstLogin) {
          setPopup({
            title: "Account first setting",
            component: "first-login",
          });
          navigate("/settings");
        } else {
          resetPopup();
          toast.success("Hi, @" + data.userData.username);
          navigate("/");
        }

        setUserData((p) => ({ ...p, ...data.userData }));
      } else {
        resetUserData();
        navigate("/verify-account");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  const onSubmit = (e) => {
    if ([e.key, e.code].includes("Enter")) {
      onAccess();
    }
  };

  return (
    <div className="access-form">
      <div className="form" onSubmit={onAccess}>
        <div>
          <p className="input-name">Email</p>
          <input
            className="input-text"
            type="email"
            name="email"
            value={userData.email}
            onChange={onChange}
            onKeyDown={onSubmit}
          />
        </div>
        <PasswordInput
          name={"password"}
          value={userData.password}
          onChange={onChange}
          activeForgot={accessType === "login"}
          onKeyDown={onSubmit}
        />
        {accessType === "signup" && (
          <>
            <div>
              <p className="input-name">Date of birth</p>
              <div className="input-date">
                <select
                  name="month"
                  id=""
                  value={userData.dateOfBirth.getMonth() + 1}
                  onChange={onChangeDateBirth}
                >
                  {months.map((e, i) => (
                    <option key={"mouth" + i} value={e.number}>
                      {e.mouth}
                    </option>
                  ))}
                </select>
                <select
                  name="day"
                  id=""
                  value={userData.dateOfBirth.getDate()}
                  onChange={onChangeDateBirth}
                >
                  {calendarDays.map((e, i) => (
                    <option key={"day" + i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  id=""
                  value={userData.dateOfBirth.getFullYear()}
                  onChange={onChangeDateBirth}
                >
                  {years().map((e, i) => (
                    <option key={"year" + i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="terms-acceptance-checkbox">
              <input
                type="checkbox"
                name="termsAcceptance"
                id="termsAcceptance"
                checked={userData.termsAcceptance}
                onChange={onChange}
              />
              <label htmlFor="termsAcceptance">
                {userData.termsAcceptance && <CheckIcon />}
              </label>
              <label htmlFor="termsAcceptance">
                I accept the <Link to={"/terms-of-use"}>terms of use</Link> and
                the <Link to={"privacy-policy"}>privacy policy</Link>.
              </label>
            </div>
          </>
        )}
        <button type="submit" className="button submit-btn" onClick={onAccess}>
          {accessType === "signup" ? "Sign up" : "Login"}
        </button>
      </div>

      <div className="switch">
        <span>
          {accessType === "signup" ? "Already signed up ?" : "No account yet?"}
        </span>
        <Link
          to={accessType === "signup" ? "/login" : "/signup"}
          onClick={() => resetPopup()}
        >
          {accessType === "signup" ? "Log in" : "Sign up"}
        </Link>
      </div>
    </div>
  );
}
