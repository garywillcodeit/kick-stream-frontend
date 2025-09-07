import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Error404Page from "./Error404Page";
import { AppContexts } from "../contexts/AppContext";
import PageHelmet from "../components/PageHelmet";
import { getRequest, postRequest } from "../utils/requests/serverRequests";
import Lottie from "lottie-react";
import loadingLottie from "../assets/lotties/loading.json";
import UserProfileSkeleton from "../components/skeletons/UserProfileSkeleton";
import ContentGrid from "../components/content_grid/ContentGrid";
import MainData from "../components/profile_page/MainData";
import WrapperSelector from "../components/profile_page/WrapperSelector";
import AccountData from "../components/profile_page/AccountData";
import { ProfileContext } from "../contexts/ProfileContext";

export default function ProfilePage() {
  const { username } = useParams();
  const { isIOS, resetUserData } = useContext(AppContexts);
  const {
    scrollRef,
    sectionScrollRef,
    profileData,
    setProfileData,
    fixedSelector,
    setFixedSelector,
  } = useContext(ProfileContext);

  const [isFetchingContent, setIsFetchingContent] = useState(false);
  const [lastContentReached, setLastContentReached] = useState(false);
  const [accountState, setAccountState] = useState("fetching");
  const lastItemRef = useRef(null);

  useEffect(() => {
    setAccountState("fetching");
    setFixedSelector(false);
    getRequest("/profile/" + username)
      .then(({ data }) => {
        setProfileData(data);
        setAccountState("");
      })
      .catch((error) => {
        if (error?.response?.data) {
          const { data } = error.response;

          if (data?.isTempSuspended || data?.isPermSuspended) {
            setAccountState("suspended");

            if (data?.isCurrentUser) {
              resetUserData();
            }
          } else if (data?.isUserNotFound) {
            setAccountState("not-found");
          }
        }
      });

    return () => {
      setFixedSelector(false);
    };
  }, [username]);

  const onScroll = () => {
    const { y } = scrollRef.current.getBoundingClientRect();

    if (y <= 60 + 50) {
      setFixedSelector(true);
    } else {
      setFixedSelector(false);
    }

    if (!isFetchingContent && lastItemRef.current) {
      const { top } = lastItemRef.current.getBoundingClientRect();

      if (top <= innerHeight) {
        onLoadContent();
      }
    }
  };

  function onLoadContent() {
    setIsFetchingContent(true);
    const { contents } = profileData;
    const excludedIds = profileData.contents.map((e) => e._id);

    setTimeout(() => {
      if (!lastContentReached) {
        postRequest("/profile/load-more-content/" + username, {
          excludedIds,
        }).then(({ data }) => {
          if (data.length === 0) {
            setLastContentReached(true);
          } else {
            setProfileData((p) => ({
              ...p,
              contents: [...contents, ...data],
            }));
            setIsFetchingContent(false);
          }
        });
      }
    }, 1000);
  }

  return (
    <>
      {(() => {
        if (username.startsWith("@")) {
          switch (accountState) {
            case "fetching":
              return <UserProfileSkeleton />;

            case "suspended":
              return (
                <section className="section error-404">
                  <h1>SUSPENDED</h1>
                  <p>{`The user ${username} has been suspended.`}</p>
                </section>
              );
            case "not-found":
              return <Error404Page />;

            default:
              return (
                <section
                  ref={sectionScrollRef}
                  className={`section ${
                    isIOS ? "pwa-mode" : ""
                  } user-profile-section`}
                  onScroll={onScroll}
                >
                  <PageHelmet metaType={"profile"} data={profileData} />
                  <MainData />
                  <div>
                    <WrapperSelector />
                    <div
                      ref={scrollRef}
                      className={`scroll-wrapper`}
                      style={fixedSelector ? { marginTop: "50px" } : {}}
                    >
                      <div>
                        <ContentGrid
                          contentList={profileData.contents}
                          contentType={"profile"}
                          profileData={profileData}
                          lastItemRef={lastItemRef}
                        />
                      </div>

                      <AccountData />
                      {!lastContentReached && isFetchingContent && (
                        <Lottie
                          animationData={loadingLottie}
                          className="loading-lottie"
                        />
                      )}
                    </div>
                  </div>
                </section>
              );
          }
        } else {
          <Error404Page />;
        }
      })()}
    </>
  );
}
