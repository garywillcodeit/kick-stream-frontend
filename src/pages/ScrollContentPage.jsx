import React, { useContext, useEffect, useRef, useState } from "react";
import { postRequest } from "../utils/requests/serverRequests";
import { AppContexts } from "../contexts/AppContext";
import { useLocation, useParams } from "react-router-dom";
import indexesAdding from "../utils/features/indexesAdding";
import Error404 from "../components/sections/scrollable_content_sections/Error404.jsx";
import DeletedContent from "../components/sections/scrollable_content_sections/DeletedContent.jsx";
import ExoClickAd from "../components/sections/scrollable_content_sections/ExoClickAd.jsx";
import LoadingBlur from "../components/LoadingBlur.jsx";
import PageHelmet from "../components/PageHelmet.jsx";
import useError from "../hooks/useError.js";
import InstallPWA from "../components/sections/scrollable_content_sections/InstallPWA.jsx";
import { ScrollContentContext } from "../contexts/ScrollContentContext.jsx";
import VideoContextProvider from "../contexts/VideoContext.jsx";
import VideoSection from "../components/sections/scrollable_content_sections/VideoSection.jsx";

export default function ScrollContentPage({ path, pageType }) {
  const [triggeId, setTriggerId] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [lastCtnReached, setLastCtnReached] = useState(false);
  const divRef = useRef(null);
  const contentRefs = useRef([]);
  const { isPWA, isPWAOnIOS, isAndroid, deferredPrompt } =
    useContext(AppContexts);
  const { contentList, setContentList, setActiveContent } =
    useContext(ScrollContentContext);
  const { slug } = useParams();
  const { pathname, state } = useLocation();
  const { errorHandler } = useError();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo(0, 0);
    }

    if (state?.deletedAccountContent) {
      setContentList(state.deletedAccountContent);
    } else {
      fetchNewContent()
        .then((contents) => {
          setActiveContent(contents[0]);
        })
        .catch((e) => errorHandler(e));
    }

    return () => {
      setContentList([]);
    };
  }, []);

  useEffect(() => {
    const switchContentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const div = entry.target;
            const videoId = div.getAttribute("data-id");
            const videoIndex = parseInt(div.getAttribute("data-index"));

            setActiveContent(contentList[videoIndex]);

            if (videoId === triggeId && !isFetching && !lastCtnReached) {
              fetchNewContent();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    contentRefs.current.forEach((ctn) => {
      if (ctn) switchContentObserver.observe(ctn);
    });

    return () => {
      contentRefs.current.forEach((ctn) => {
        if (ctn) switchContentObserver.unobserve(ctn);
      });
    };
  }, [contentList]);

  const fetchNewContent = async () => {
    setIsFetching(true);

    let apiPath = "";

    if (pageType === "profile") {
      apiPath = `/content${pathname.replace("@", "")}`;
    } else if (pageType === "category" && slug) {
      apiPath = `/content/category/` + slug;
    } else if (contentList.length === 0 && slug) {
      apiPath = path + slug;
    } else {
      apiPath = path;
    }

    try {
      const excludedIds = contentList.map((e) => e._id);
      const body = { excludedIds, isPWA, isAndroid };
      const res = await postRequest(apiPath, body);

      if (res?.data?.length > 0) {
        let contents = [];
        if (isFirstFetch) {
          contents = res.data;
          setIsFirstFetch(false);
        } else {
          contents = [...contentList, ...res.data];
        }

        contents = indexesAdding(contents);
        setContentList(contents);

        if (contents.length >= 10) {
          setTriggerId(contents[contents.length - 2]._id);
        }

        return contents;
      } else {
        setLastCtnReached(true);
        return [];
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <section
        ref={divRef}
        className={`snap-scrollable-page ${isPWAOnIOS ? "pwa-mode" : ""}`}
      >
        {contentList[0] && (
          <PageHelmet
            metaType={pathname === "/" ? "home" : "content"}
            data={contentList[0]}
          />
        )}

        {contentList.length > 0 ? (
          <>
            {contentList.map((ctn, i) => {
              if (ctn) {
                if (ctn.status === "404-error") {
                  return (
                    <Error404
                      key={ctn._id}
                      ctn={ctn}
                      index={i}
                      refs={contentRefs}
                    />
                  );
                } else if (ctn.status === "deleted") {
                  return (
                    <DeletedContent
                      key={ctn._id}
                      ctn={ctn}
                      refs={contentRefs}
                      index={i}
                    />
                  );
                } else if (ctn.status === "exoclick") {
                  return (
                    <ExoClickAd
                      key={ctn._id}
                      ctn={ctn}
                      refs={contentRefs}
                      index={i}
                    />
                  );
                } else if (ctn.status === "install-pwa" && deferredPrompt) {
                  return (
                    <InstallPWA
                      key={ctn._id}
                      ctn={ctn}
                      refs={contentRefs}
                      index={i}
                    />
                  );
                } else {
                  return (
                    <VideoContextProvider key={"provider" + ctn._id}>
                      <VideoSection
                        key={ctn._id}
                        ctn={ctn}
                        refs={contentRefs}
                        index={i}
                      />
                    </VideoContextProvider>
                  );
                }
              }
            })}
          </>
        ) : (
          <LoadingBlur isLoadingPage={true} />
        )}
      </section>
    </>
  );
}
