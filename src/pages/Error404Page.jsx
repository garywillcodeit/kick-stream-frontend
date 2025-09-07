import React, { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import PageHelmet from "../components/PageHelmet";
import { useNavigate, useParams } from "react-router-dom";

export default function Error404Page() {
  const { menuData } = useContext(AppContexts);
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <section
        className={`section error-404 ${menuData.component ? "disabled" : ""}`}
      >
        <PageHelmet metaType={"error404"} />
        <h1>404</h1>
        <h2>NOT FOUND</h2>
        {username ? (
          <p>{`The user "${username}" does not exist.`}</p>
        ) : (
          <p>You are looking for a page that does not exist.</p>
        )}
        <button className="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </section>
    </>
  );
}
