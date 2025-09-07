import React from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { useState } from "react";
import inputChanger from "../utils/features/inputChanger";
import { postRequest } from "../utils/requests/serverRequests";
import toast from "react-hot-toast";
import contactUsFormValidator from "../utils/validators/contactUsFormValidator";
import { useEffect } from "react";
import { useRef } from "react";
import PageHelmet from "../components/PageHelmet";
import adsHandler from "../utils/features/adsHandler";
import useError from "../hooks/useError.js";

export default function ContactUsPage() {
  const { menuData, userData, isPWAOnIOS } = useContext(AppContexts);
  const emailInit = {
    name: "",
    email: "",
    selectSubject: "",
    otherSubject: "",
    body: "",
  };
  const [emailData, setEmailData] = useState(emailInit);
  const [charCounter, setCharCounter] = useState(0);
  const textareaRef = useRef(null);
  const { errorHandler } = useError();

  useEffect(() => {
    adsHandler();
  }, []);

  useEffect(() => {
    setCharCounter(emailData.body.trim().length);
  }, [emailData.body]);

  const onChange = (e) => {
    setEmailData((p) => ({ ...p, ...inputChanger(e) }));
  };

  const onSubmit = async () => {
    const error = contactUsFormValidator(emailData, userData);
    if (error) {
      toast.error(error);
      return;
    }
    await toast.promise(postRequest("/contact/send-email", emailData), {
      loading: "Sending your email...",
      success: ({ data }) => {
        setEmailData(emailInit);
        localStorage.removeItem("reportData");
        return data.msg;
      },
      error: (error) => errorHandler(error),
    });
  };

  return (
    <>
      <section
        className={`section ${isPWAOnIOS ? "pwa-mode" : ""} contact-section ${
          menuData.component ? "disabled" : ""
        }`}
      >
        <PageHelmet metaType={"contact-us"} />
        <h1>Contact us</h1>
        <ins className="eas6a97888e37" data-zoneid="5516464"></ins>
        <div className="form contact-us">
          {!userData.isLogged && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input-text"
                value={emailData.name}
                onChange={onChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Your email"
                className="input-text"
                value={emailData.email}
                onChange={onChange}
              />
            </>
          )}
          <select
            className="input-text"
            name="selectSubject"
            id=""
            onChange={onChange}
            value={emailData.selectSubject}
          >
            <option value="">--Select a subject--</option>
            <option value="Request to delete content">
              Request to delete content
            </option>
            <option value="Report content that violates the terms of use">
              Report content that violates the terms of use
            </option>
            <option value="Report comment that violates the terms of use">
              Report comment that violates the terms of use
            </option>
            <option value="other">Other request</option>
          </select>
          {emailData.selectSubject === "other" && (
            <input
              type="text"
              name="otherSubject"
              placeholder="Specify the subject"
              className="input-text"
              value={emailData.otherSubject}
              onChange={onChange}
            />
          )}
          <div
            className="input-text textarea-wrapper"
            onClick={() => textareaRef.current.focus()}
          >
            <textarea
              ref={textareaRef}
              placeholder="Your message"
              name="body"
              value={emailData.body}
              onChange={onChange}
            ></textarea>
            <p>{charCounter + "/1000"}</p>
          </div>
          <button className="button" onClick={onSubmit}>
            Send
          </button>
        </div>
      </section>
    </>
  );
}
