import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lotties/loading.json";
import ContentGridCM from "../context_menu/ContentGridCM";
import Picture from "../Picture";
import HoverData from "./HoverData";

export default function ContentGrid({
  contentList,
  contentType,
  profileData,
  lastItemRef,
}) {
  const navigate = useNavigate();
  const [activeCM, setActiveCM] = useState(undefined);
  const { pathname } = useLocation();
  const cmRef = useRef(null);
  const { VITE_ENV } = import.meta.env;

  useEffect(() => {
    const handleClick = (e) => {
      let index = e.target.getAttribute("data-ctn-index");
      const slug = e.target.getAttribute("data-video-slug");

      if (index && activeCM === undefined) {
        index = parseInt(index);

        if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
          setActiveCM(index);
        } else if (profileData) {
          navigate(`/@${profileData.username}/${slug}`);
        } else if (pathname === "/my-likes") {
          navigate("/my-likes/" + slug);
        } else {
          navigate("/content/" + slug);
        }
      } else {
        setActiveCM(undefined);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [cmRef.current, activeCM]);

  const onContextMenu = (e, i) => {
    e.preventDefault();
    setActiveCM(i);
  };

  return (
    <>
      {contentList.length > 0 ? (
        <div className={`content-grid ${contentType}`}>
          {contentList.map((ctn, i) => {
            if (
              ctn.status === "validated" ||
              (["development", "test"].includes(VITE_ENV) &&
                ctn.status === "test")
            ) {
              return (
                <div
                  key={i}
                  ref={(e) => {
                    if (i === contentList.length - 1) lastItemRef.current = e;
                  }}
                  className="video"
                  onContextMenu={(e) => onContextMenu(e, i)}
                  data-ctn-index={i}
                  data-video-slug={ctn.slug}
                >
                  <Picture urls={ctn.thumbnails} alt={"Thumbnail"} />
                  {activeCM === i && (
                    <ContentGridCM content={ctn} cmRef={cmRef} />
                  )}
                  <HoverData data={ctn} />
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  ref={(e) => {
                    if (i === contentList.length - 1) lastItemRef.current = e;
                  }}
                  className="content unavailable"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <h2>Processing</h2>
                  <p>in progress</p>
                  <Lottie
                    animationData={loadingLottie}
                    loop
                    className="lottie"
                  />
                  {activeCM === i && (
                    <ContentGridCM content={ctn} cmRef={cmRef} />
                  )}
                </div>
              );
            }
          })}
        </div>
      ) : (
        <>
          {contentType === "profile" && (
            <p className="no-content">
              This creator has not published any content yet.
            </p>
          )}
          {contentType === "likes" && (
            <p className="no-content">You haven't liked any content yet.</p>
          )}
        </>
      )}
    </>
  );
}
