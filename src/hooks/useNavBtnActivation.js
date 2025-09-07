import { useContext, useEffect } from "react";
import { activeBtnInit, AppContexts } from "../contexts/AppContext";
import { useLocation, useParams } from "react-router-dom";

export default function useNavBtnActivation() {
  const { setActiveBtn, userData } = useContext(AppContexts);
  const { pathname } = useLocation();
  const { username } = useParams();

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveBtn({ ...activeBtnInit, home: true });
        break;
      case "/discover":
        setActiveBtn({ ...activeBtnInit, discover: true });
        break;
      case "/my-likes":
        setActiveBtn({ ...activeBtnInit, likes: true });
        break;
      case "/settings":
        setActiveBtn({ ...activeBtnInit, settings: true });
        break;
      case "/login":
        setActiveBtn({ ...activeBtnInit, account: true });
        break;
      case "/signup":
        setActiveBtn({ ...activeBtnInit, account: true });
        break;
      case "/contact-us":
        setActiveBtn({ ...activeBtnInit, contact: true });
        break;
      case "/privacy-policy":
        setActiveBtn({ ...activeBtnInit, privacy: true });
        break;
      case "/terms-of-use":
        setActiveBtn({ ...activeBtnInit, tos: true });
        break;
      case `/@${userData.username}`:
        setActiveBtn({ ...activeBtnInit, profile: true });
        break;
      case `/${username}`:
        setActiveBtn({ ...activeBtnInit, discover: true });
        break;
      case "/add-content":
        setActiveBtn({ ...activeBtnInit, addContent: true });
        break;
    }
  }, [pathname, username]);

  return;
}
