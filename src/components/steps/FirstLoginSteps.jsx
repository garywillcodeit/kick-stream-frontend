import React, { useContext } from "react";
import Steps from "./Steps";
import { AppContexts } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { autoXScroll } from "../../utils/features/autoScroll";
import toast from "react-hot-toast";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError";
import { FirstLoginContext } from "../popup/first_login_popup/FirstLoginPopup";
import useContentUploader from "../../hooks/useContentUploader";

export default function FirstLoginSteps() {
  const { userData, setUserData, resetPopup, categories } =
    useContext(AppContexts);
  const { step, setStep, scrollRef } = useContext(FirstLoginContext);
  const navigate = useNavigate();
  const { errorHandler } = useError();
  const { onUploadNewAvatar } = useContentUploader();

  const onPass = async () => {
    let left = 0;
    switch (step) {
      case 1:
        left = (scrollRef.current.scrollWidth * 33.33) / 100;
        autoXScroll(scrollRef, left);
        setStep(2);
        break;
      case 2:
        left = (scrollRef.current.scrollWidth * 66.66) / 100;
        autoXScroll(scrollRef, left);
        setStep(3);
        break;
      case 3:
        await getRequest("/user/first-login/abort");
        navigate("/");
        resetPopup();
        break;
    }
  };

  const onNextStep = async () => {
    let left = 0;
    let loadToast;

    try {
      switch (step) {
        case 1:
          loadToast = toast.loading("Saving username...");
          let { data: data1 } = await putRequest("/user/username", {
            newUsername: userData.newUsername,
          });
          setUserData((p) => ({ ...p, ...data1.userData }));

          left = (scrollRef.current.scrollWidth * 33.33) / 100;
          autoXScroll(scrollRef, left);
          setStep(2);
          break;
        case 2:
          await onUploadNewAvatar();
          left = (scrollRef.current.scrollWidth * 66.66) / 100;
          autoXScroll(scrollRef, left);
          setStep(3);
          break;
        case 3:
          const categoryIds = categories
            .filter((e) => e.selected)
            .map((e) => e._id);

          if (categoryIds.length < 3) {
            throw new Error("You must select at least 3 categories.");
          }

          let { data: data2 } = await postRequest(
            "/user/first-login/categories",
            {
              categoryIds,
            }
          );

          toast.success("Hi, @" + userData.username);
          navigate("/");
          resetPopup();
          break;
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      if (loadToast) {
        toast.remove(loadToast);
      }
    }
  };

  return (
    <Steps
      step={step}
      type={"first-login"}
      onPrevious={onPass}
      onNext={onNextStep}
    />
  );
}
