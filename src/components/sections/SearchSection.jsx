import React from "react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/requests/serverRequests";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Lottie from "lottie-react";
import loading from "../../assets/lotties/loading.json";
import Picture from "../../components/Picture";
import interactionCounter from "../../utils/features/interactionCounter";
import HashTagIcon from "../../assets/img/icons/HashTagIcon";
import { AppContexts } from "../../contexts/AppContext";

export default function SearchSection() {
  const {
    search,
    setSearch,
    searching,
    setSearching,
    searchResult,
    setSearchResult,
  } = useContext(AppContexts);
  const navigate = useNavigate();
  const detectorRef = useRef(null);
  const sectionRef = useRef(null);
  const [enableFetch, setEnableFetch] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setEnableFetch(true);
  }, [search]);

  useEffect(() => {
    const ref = sectionRef.current;

    const listener = () => {
      const { bottom } = detectorRef.current.getBoundingClientRect();

      if (search && enableFetch && bottom <= window.innerHeight) {
        ref.removeEventListener("scroll", listener);
        setFetching(true);

        const excludedIds = searchResult.contents.map((e) => e._id);

        setTimeout(() => {
          postRequest(`/search/videos?search=${search}`, { excludedIds })
            .then(({ data }) => {
              if (data.contents.length > 0) {
                const contents = [...searchResult.contents, ...data.contents];
                setSearchResult((p) => ({ ...p, contents }));
              } else {
                setEnableFetch(false);
              }
            })
            .finally(() => setFetching(false));
        }, 1500);
      }
    };
    if (ref) {
      ref.addEventListener("scroll", listener);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", listener);
      }
    };
  }, [searchResult, search]);

  const onGoToProfile = (username) => {
    resetSearch();
    navigate("/@" + username);
  };

  const onChooseCategorie = (item) => {
    resetSearch();
    navigate("/category/" + item.slug);
  };

  const onChooseContent = (item) => {
    resetSearch();
    navigate("/content/" + item.slug);
  };

  const resetSearch = () => {
    setSearch("");
    setSearching(false);
  };

  return (
    <>
      <div
        className={`search-div ${searching ? "active" : ""}`}
        ref={sectionRef}
      >
        <div className="search-inner-wrapper">
          {searchResult?.users?.map((item, index) => (
            <div
              key={index}
              className="card user"
              onClick={() => onGoToProfile(item.username)}
            >
              <Picture
                urls={item.avatarUrls}
                alt={"Thumbnail"}
                className={"avatar"}
              />
              <div>
                <p className="username">{"@" + item.username}</p>
                {item.followers > 0 && (
                  <p className="description">
                    {interactionCounter(item.followers)} followers
                  </p>
                )}
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
          {searchResult?.categories?.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => onChooseCategorie(item)}
            >
              <HashTagIcon />
              <p>{item.name}</p>
            </div>
          ))}
          {searchResult?.contents?.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => onChooseContent(item)}
            >
              <Picture urls={item.thumbnails} alt={"Thumbnail"} />
              <p>{item.title}</p>
            </div>
          ))}
          <div className="loading-element" ref={detectorRef}></div>
          {fetching && (
            <Lottie
              animationData={loading}
              className="lottie  loading-element"
            />
          )}
        </div>
      </div>
    </>
  );
}
