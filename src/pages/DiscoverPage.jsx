import React, { useRef } from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useState } from "react";
import { postRequest } from "../utils/requests/serverRequests";
import LoadingBlur from "../components/LoadingBlur";
import PageHelmet from "../components/PageHelmet";
import loading from "../assets/lotties/loading.json";
import adsHandler from "../utils/features/adsHandler";
import ContentGrid from "../components/content_grid/ContentGrid";

export default function DiscoverPage() {
  const {
    menuData,
    searching,
    isPWAOnIOS,
    discoverContentList,
    setDiscoverContentList,
  } = useContext(AppContexts);
  const [isFetching, setIsFetching] = useState(
    discoverContentList.length === 0
  );
  const [isLoadingPage, setIsLoadingPage] = useState(
    discoverContentList.length === 0
  );
  const [lastContentReached, setLastContentReached] = useState(false);
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (discoverContentList.length === 0) {
      onLoadContent().then(() => {
        const lastItemTop = lastItemRef.current?.getBoundingClientRect().top;
        if (lastItemTop <= innerHeight) {
          onLoadContent();
        }
      });
    }
  }, []);

  useEffect(() => {
    adsHandler();
  }, []);

  const onScrollEnd = () => {
    if (!isFetching && lastItemRef.current) {
      const lastItemTop = lastItemRef.current.getBoundingClientRect().top;

      if (lastItemTop <= innerHeight) {
        onLoadContent();
      }
    }
  };

  async function onLoadContent() {
    setIsFetching(true);
    const excludedIds = discoverContentList.map((e) => e._id);
    if (!lastContentReached) {
      postRequest("/content/discover", { excludedIds }).then(({ data }) => {
        if (data.length === 0) {
          setLastContentReached(true);
        } else {
          setDiscoverContentList((p) => [...p, ...data]);

          setIsFetching(false);
          setTimeout(() => {
            setIsLoadingPage(false);
          }, 200);
        }
      });
    }
  }

  return (
    <>
      <section
        className={`section ${isPWAOnIOS ? "pwa-mode" : ""} list-section ${
          menuData.component || searching || isLoadingPage ? "disabled" : ""
        } `}
        onScroll={onScrollEnd}
      >
        <PageHelmet metaType={"discover"} />
        <ins className="eas6a97888e37" data-zoneid="5516462"></ins>
        <ContentGrid
          contentList={discoverContentList}
          contentType={"discover"}
          lastItemRef={lastItemRef}
        />
        {isFetching && discoverContentList.length && (
          <Lottie animationData={loading} loop className="loading-lottie" />
        )}
        <LoadingBlur isLoadingPage={isLoadingPage} />
      </section>
    </>
  );
}
