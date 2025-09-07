import React, { useContext } from "react";
import Steps from "./Steps";
import { AppContexts } from "../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { autoXScroll } from "../../utils/features/autoScroll";
import toast from "react-hot-toast";
import {
  deleteRequest,
  postRequest,
  putRequest,
} from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError";
import { submitVideoValidator } from "../../utils/validators/uploadVideoValidator";
import axios from "axios";
import isNull from "../../utils/validators/isNull";
import { AddEditContentContext } from "../../contexts/AddEditContentContext";
import useCategories from "../../hooks/useCategories";

export default function AddContentSteps({ pageType }) {
  const { videoRef, scrollRef, step, setStep, contentData, resetContentData } =
    useContext(AddEditContentContext);
  const { userData, setUserData, categories, setCategories } =
    useContext(AppContexts);
  const { sortCategories } = useCategories();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { errorHandler } = useError();

  const onPreviousStep = () => {
    let left = 0;
    switch (step) {
      case 1:
        navigate(`/@${userData.username}`);
      case 2:
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        autoXScroll(scrollRef, left);
        setStep(1);
        break;
      case 3:
        left = scrollRef.current.scrollWidth / 3;
        autoXScroll(scrollRef, left);
        setStep(2);
        break;
    }
  };

  const onNextStep = async () => {
    let left = 0;
    switch (step) {
      case 1:
        left = scrollRef.current.scrollWidth / 3;
        autoXScroll(scrollRef, left);
        setStep(2);
        videoRef.current.pause();
        break;
      case 2:
        if (isNull(contentData.title)) {
          toast.error("You must write a title.");
        } else if (contentData.title.trim().length > 200) {
          toast.error("The title length cannot exceed 200 characters.");
        } else {
          await getCatAutoComp(contentData.title.trim());

          left = (scrollRef.current.scrollWidth / 3) * 2;
          autoXScroll(scrollRef, left);
          setStep(3);
        }
        break;
      case 3:
        if (pageType === "add-content") {
          await onUploadContent();
        } else {
          await onUpdateContent();
        }
        break;
    }
  };

  const getCatAutoComp = async () => {
    const loadToast = toast.loading("Loading...");
    try {
      const { data } = await postRequest("/upload/category-auto-comp", {
        title: contentData.title,
      });

      const selectedCats = [...categories]
        .filter((e) => e.selected)
        .map((e) => e._id);

      setCategories((p) => {
        p = p.map((e) => {
          e.selected =
            [...data, ...selectedCats].includes(e._id) || e.userSelect;
          return e;
        });
        return sortCategories(p);
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  const onUploadContent = async () => {
    const loadToast = toast.loading("Uploading a video...");
    let res = {};

    try {
      const body = await processData("upload");

      res = await postRequest("/upload/video/new", body);
      const { uploadURL, id, lastVideoUpload } = res.data;

      if (!uploadURL) {
        throw new Error("Unable to upload the video. Please, retry later.");
      }

      await axios.put(uploadURL, contentData.file, {
        headers: { "Content-Type": contentData.file.type },
      });

      const { data } = await putRequest("/upload/video/switch-status/" + id);

      setUserData((p) => ({ ...p, lastVideoUpload }));
      resetContentData();

      toast.success(data.msg);
      navigate("/@" + userData.username);
    } catch (error) {
      errorHandler(error);
      if (res?.data?.id) {
        await deleteRequest("/upload/delete-for-error/" + res.data.id);
      }
    } finally {
      toast.remove(loadToast);
    }
  };

  const onUpdateContent = async () => {
    const loadToast = toast.loading("Updating a video...");

    try {
      const body = await processData("update");

      const { data } = await putRequest("/manage-content/" + slug, body);

      toast.success(data.msg);
      navigate("/@" + userData.username);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  const processData = async (type) => {
    const categoryIds = [...categories]
      .map((e) => e.selected && e._id)
      .filter(Boolean);

    const metadata = await submitVideoValidator(
      {
        ...contentData,
        categoryIds,
      },
      type
    );

    let body = {
      title: contentData.title,
      categories: categoryIds,
    };

    if (type === "upload") {
      body = {
        ...body,
        ...metadata,
        mimetype: contentData.file.type,
        size: contentData.file.size,
      };
    }

    return body;
  };

  return (
    <Steps
      step={step}
      type={"add-content"}
      onPrevious={onPreviousStep}
      onNext={onNextStep}
    />
  );
}
