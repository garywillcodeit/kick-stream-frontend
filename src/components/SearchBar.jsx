import React, { useContext, useEffect, useRef } from "react";
import { getRequest, postRequest } from "../utils/requests/serverRequests";
import { AppContexts } from "../contexts/AppContext";

export default function SearchBar({ className }) {
  const timeoutRef = useRef(null);
  const inputRef = useRef();
  const initData = useRef(null);

  const { searching, setSearching, setSearchResult, search, setSearch } =
    useContext(AppContexts);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (search) {
      timeoutRef.current = setTimeout(() => {
        postRequest(`/search/videos?search=${search}&withCat=true`).then(
          ({ data }) => {
            setSearchResult(data);
          }
        );
      }, 500);
    } else if (!initData.current) {
      getRequest(`/search/videos`).then(({ data }) => {
        initData.current = data;
        setSearchResult({
          contents: data.contents,
          users: data.users,
        });
      });
    } else {
      setSearchResult(initData.current);
    }
  }, [search, searching]);

  const onFocus = () => setSearching(true);

  return (
    <input
      ref={inputRef}
      className={`input-text ${className}`}
      placeholder={"What are you looking for ?"}
      type="text"
      name=""
      value={search}
      autoComplete="false"
      onChange={(e) => setSearch(e.target.value)}
      onFocus={onFocus}
    />
  );
}
