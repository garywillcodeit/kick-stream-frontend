import { useRef, useState } from "react";
import { createContext } from "react";
import getMinLegalBirthDate from "../utils/features/getMinLegalBirthDate";
import { defaultAvatarUrl } from "../utils/data/files";
import {
  isAndroidDevice,
  isIOSDevice,
  isMobileDevice,
  isPWAonIOSDevice,
  isPWApplication,
} from "../utils/features/device";

export const activeBtnInit = {
  home: false,
  discover: false,
  likes: false,
  account: false,
  contact: false,
  privacy: false,
  tos: false,
  profile: false,
  settings: false,
  addContent: false,
};

export const AppContexts = createContext();

export const AppContextsProvider = ({ children }) => {
  const userDataInit = {
    email: "",
    username: "",
    password: "",
    dateOfBirth: getMinLegalBirthDate(),
    categories: [],
    isLogged: false,
    termsAcceptance: false,
    notifications: {
      login: false,
      newsletter: false,
      newComment: false,
      newFollower: false,
    },
    avatarUrls: { jpeg: defaultAvatarUrl },
    avatar: {},
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
    website: "",
    contactEmail: "",
    description: "",
    isCommentLimited: false,
    isFetching: true,
    isUploadLimitReached: false,
  };

  const searchResultInit = {
    contents: [],
    categories: [],
    users: [],
  };

  const docInit = { body: "", date: undefined };

  const [userData, setUserData] = useState(userDataInit);
  const resetUserData = () => setUserData(userDataInit);

  const menuInit = { component: "", title: "", displayed: false };
  const [menuData, setMenuData] = useState(menuInit);
  const activeMenu = (options) => {
    menuData.ref.style.display = "grid";
    setTimeout(() => {
      menuData.ref.style.transform = "translateY(0%)";
      setMenuData((p) => ({ ...p, ...options, displayed: true }));
    }, 50);
  };
  const resetMenuData = () => {
    menuData.ref.style.transform = "translateY(100%)";
    setMenuData((p) => ({ ...p, displayed: false }));
    setTimeout(() => {
      setMenuData((p) => ({ ...p, ...menuInit }));
      menuData.ref.removeAttribute("style");
    }, 300);
  };

  const popupInit = { component: "", title: "" };
  const [popup, setPopup] = useState(popupInit);
  const resetPopup = () => setPopup(popupInit);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchRef, setSearchRef] = useState();
  const [searchResult, setSearchResult] = useState(searchResultInit);
  const resetSearchResult = () => setSearchResult(searchResultInit);

  const [activeSearch, setActiveSearch] = useState(false);
  const [callFocusSearch, setCallFocusSearch] = useState(false);

  const [isCheckingLoggedUser, setIsCheckingLoggedUser] = useState(true);
  const [verifiedAge, setVerifiedAge] = useState(false);

  const [isMuted, setIsMuted] = useState(true);
  const [activeBtn, setActiveBtn] = useState(activeBtnInit);
  const [isUploadAllowed, setIsUploadAllowed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [categories, setCategories] = useState([]);
  const [discoverContentList, setDiscoverContentList] = useState([]);
  const [likesContentList, setLikesContentList] = useState([]);
  const [termsOfUse, setTermsOfUse] = useState(docInit);
  const [privacyPolicy, setPrivacyPolicy] = useState(docInit);
  const isPWA = isPWApplication();
  const isAndroid = isAndroidDevice();
  const isIOS = isIOSDevice();
  const isMobile = isMobileDevice();
  const isPWAOnIOS = isPWAonIOSDevice();
  const adScriptRef = useRef(null);

  return (
    <AppContexts.Provider
      value={{
        menuData,
        setMenuData,
        activeMenu,
        resetMenuData,
        popup,
        setPopup,
        resetPopup,
        searching,
        setSearching,
        searchRef,
        setSearchRef,
        activeSearch,
        setActiveSearch,
        callFocusSearch,
        setCallFocusSearch,
        userData,
        setUserData,
        resetUserData,

        isCheckingLoggedUser,
        setIsCheckingLoggedUser,
        verifiedAge,
        setVerifiedAge,

        isMuted,
        setIsMuted,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        resetSearchResult,
        activeBtn,
        setActiveBtn,
        isUploadAllowed,
        setIsUploadAllowed,
        deferredPrompt,
        setDeferredPrompt,
        categories,
        setCategories,
        discoverContentList,
        setDiscoverContentList,
        likesContentList,
        setLikesContentList,
        termsOfUse,
        setTermsOfUse,
        privacyPolicy,
        setPrivacyPolicy,
        isPWA,
        isAndroid,
        isIOS,
        isMobile,
        isPWAOnIOS,
        adScriptRef,
      }}
    >
      {children}
    </AppContexts.Provider>
  );
};
