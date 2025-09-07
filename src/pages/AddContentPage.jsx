import { useContext, useEffect } from "react";
import { AppContexts } from "../contexts/AppContext";
import { getRequest } from "../utils/requests/serverRequests";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/add_content_page/VideoPlayer.jsx";
import CategoriesSelector from "../components/add_content_page/CategoriesSelector.jsx";
import Description from "../components/add_content_page/Description.jsx";
import { autoXScroll } from "../utils/features/autoScroll.js";
import AddContentSteps from "../components/steps/AddContentSteps.jsx";
import useCategories from "../hooks/useCategories.js";
import PageHelmet from "../components/PageHelmet.jsx";
import { AddEditContentContext } from "../contexts/AddEditContentContext.jsx";
import useError from "../hooks/useError.js";

export default function AddContentPage({ pageType }) {
  const { menuData, userData, isPWAOnIOS } = useContext(AppContexts);
  const { videoRef, scrollRef, setStep, setContentData } = useContext(
    AddEditContentContext
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const { slug } = useParams();
  const { errorHandler } = useError();

  const { getCategories } = useCategories();

  useEffect(() => {
    if (userData.isLogged) {
      if (pageType === "edit-content" && slug) {
        getRequest("/manage-content/" + slug)
          .then(({ data }) => {
            getCategories(data.categories).then(() => {
              setContentData(data);
              autoXScroll(0, scrollRef);
              setStep(1);
            });
          })
          .catch((err) => {
            if (err.code === 404) {
              errorHandler(err);
              navigate("/@" + userData.username);
            }
          });
      } else if (state.file) {
        const url = URL.createObjectURL(state.file);
        videoRef.current.src = url;
        setContentData((p) => ({ ...p, file: state.file }));
        getCategories().then(() => {
          autoXScroll(0, scrollRef);
          setStep(1);
        });
      } else {
        navigate("/@" + userData.username);
      }
    } else {
      navigate("/login");
    }
  }, [state?.file]);

  return (
    <section
      className={`section ${isPWAOnIOS ? "pwa-mode" : ""} add-content-section ${
        menuData.component ? "disabled" : ""
      }`}
    >
      <PageHelmet />
      <AddContentSteps pageType={pageType} />
      <div
        ref={scrollRef}
        className={`steps-container ${isPWAOnIOS ? "is-pwa" : ""}`}
      >
        <VideoPlayer />
        <Description />
        <CategoriesSelector />
      </div>
    </section>
  );
}
