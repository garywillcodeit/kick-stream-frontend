import React, { useRef, useState } from "react";
import { createContext } from "react";

export const ProfileContext = createContext();

const profileDataInit = {
  username: "",
  contents: [],
  social: {
    onlyfans: "",
    mym: "",
    instagram: "",
    tiktok: "",
    snapchat: "",
    x: "",
    telegram: "",
    youtube: "",
  },
  contactEmail: "",
  website: "",
  isFollowed: false,
  contentCount: 0,
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  followerCount: 0,
  followedCount: 0,
  followingCount: 0,
};

export default function ProfileContextProvider({ children }) {
  const scrollRef = useRef(null);
  const sectionScrollRef = useRef(null);
  const lastContentRef = useRef(null);
  const [profileData, setProfileData] = useState(profileDataInit);
  const resetProfileData = () => setProfileData(profileDataInit);
  const [fixedSelector, setFixedSelector] = useState(false);
  const [activeCM, setActiveCM] = useState(null);
  return (
    <ProfileContext.Provider
      value={{
        scrollRef,
        sectionScrollRef,
        lastContentRef,
        profileData,
        setProfileData,
        resetProfileData,
        fixedSelector,
        setFixedSelector,
        activeCM,
        setActiveCM,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
