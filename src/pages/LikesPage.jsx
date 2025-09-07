import React from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { postRequest } from "../utils/requests/serverRequests";
import LoadingBlur from "../components/LoadingBlur";
import PageHelmet from "../components/PageHelmet";
import loading from "../assets/lotties/loading.json";
import adsHandler from "../utils/features/adsHandler";
import ContentGrid from "../components/content_grid/ContentGrid";

export default function LikesPage() {
  const { menuData, isPWAOnIOS, likesContentList, setLikesContentList } =
    useContext(AppContexts);
  const [isLoadingPage, setIsLoadingPage] = useState(
    likesContentList.length === 0
  );
  const [isFetching, setIsFetching] = useState(likesContentList.length === 0);
  const [lastContentReached, setLastContentReached] = useState(false);
  const lastItemRef = useRef(null);

  useEffect(() => {
    adsHandler();

    const addedFromLikeBtn = likesContentList.filter((e) => !e.addFromLikeBtn);

    if (addedFromLikeBtn.length === 0) {
      onLoadContent().then(() => {
        if (lastItemRef.current) {
          const lastItemTop = lastItemRef.current?.getBoundingClientRect().top;
          if (lastItemTop <= innerHeight) {
            onLoadContent();
          }
        }
      });
    }

    return () => {
      setLikesContentList((p) => p.filter((e) => e.isLiked));
    };
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
    if (!lastContentReached) {
      setIsFetching(true);
      const excludedIds = likesContentList.map((e) => e._id);

      postRequest("/content/likes", { excludedIds }).then(({ data }) => {
        const contents = data.filter((e) => e.status === "validated");
        if (contents.length === 0) {
          setLastContentReached(true);
          setIsFetching(false);
        } else {
          setLikesContentList((p) => [...p, ...data]);
          setIsFetching(false);
        }

        setTimeout(() => {
          setIsLoadingPage(false);
        }, 200);
      });
    }
  }

  return (
    <section
      className={`section ${isPWAOnIOS ? "pwa-mode" : ""} list-section ${
        menuData.component ? "disabled" : ""
      }`}
      onScroll={onScrollEnd}
    >
      <PageHelmet metaType={"likes"} />
      <ins className="eas6a97888e37" data-zoneid="5516468"></ins>
      <ContentGrid
        contentList={likesContentList}
        contentType={"likes"}
        lastItemRef={lastItemRef}
      />
      {isFetching && likesContentList.length && (
        <Lottie animationData={loading} loop className="loading-lottie" />
      )}
      <LoadingBlur isLoadingPage={isLoadingPage} />
    </section>
  );
}
