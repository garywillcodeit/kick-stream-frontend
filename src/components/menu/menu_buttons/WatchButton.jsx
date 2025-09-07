import React from "react";
import EyeOpenIcon from "../../../assets/img/icons/EyeOpenIcon";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WatchButton({ slug }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { pathname } = useLocation();

  const onWatch = () => {
    if (username) {
      navigate(`/${username}/${slug}`);
    } else if (pathname === "/my-likes") {
      navigate("/my-likes/" + slug);
    } else {
      navigate("/content/" + slug);
    }
  };

  return (
    <li>
      <button onClick={onWatch}>
        <EyeOpenIcon />
        Watch
      </button>
    </li>
  );
}
