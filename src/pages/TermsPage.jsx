import React from "react";
import { useContext } from "react";
import { AppContexts, docInit } from "../contexts/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { getRequest } from "../utils/requests/serverRequests";
import PageHelmet from "../components/PageHelmet";
import TermsSkeleton from "../components/skeletons/TermsSkeleton";
import adsHandler from "../utils/features/adsHandler";
import isNull from "../utils/validators/isNull";

export default function TermsPage({ type }) {
  const { menuData, isPWAOnIOS, termsOfUse, setTermsOfUse } =
    useContext(AppContexts);
  const [showSection, setShowSection] = useState(false);
  const [document, setDocument] = useState(docInit);

  useEffect(() => {
    adsHandler();
  }, [showSection]);

  useEffect(() => {
    setShowSection(false);

    let res;

    (async () => {
      if (type === "tos") {
        res = await getRequest("/document/terms-of-use");
      } else if (type === "pp") {
        res = await getRequest("/document/privacy-policy");
      }
      setDocument(res.data);
      setShowSection(true);
    })();
  }, []);

  return (
    <>
      {showSection ? (
        <section
          className={`section ${isPWAOnIOS ? "pwa-mode" : ""} term-section ${
            menuData.component ? "disabled" : ""
          }`}
        >
          {(() => {
            if (type === "tos") {
              return (
                <>
                  <PageHelmet metaType={"tos"} />
                  <h1>{document.title}</h1>
                  <ins className="eas6a97888e37" data-zoneid="5514232"></ins>
                  <div className="last-update">
                    <p>
                      {"Last update : " +
                        new Date(document.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className="inner-wrapper"
                    dangerouslySetInnerHTML={{ __html: document.body }}
                  ></div>
                </>
              );
            } else if (type === "pp") {
              return (
                <>
                  <PageHelmet metaType={"privacy"} />
                  <h1>{privacyPolicy.title}</h1>
                  <ins className="eas6a97888e37" data-zoneid="5514232"></ins>
                  <div className="last-update">
                    <p>
                      {"Last update : " +
                        new Date(privacyPolicy.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className="inner-wrapper"
                    dangerouslySetInnerHTML={{ __html: privacyPolicy.body }}
                  ></div>
                </>
              );
            }
          })()}
        </section>
      ) : (
        <TermsSkeleton />
      )}
    </>
  );
}
