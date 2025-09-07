import React from "react";
import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { getRequest } from "../utils/requests/serverRequests";
import PageHelmet from "../components/PageHelmet";
import TermsSkeleton from "../components/skeletons/TermsSkeleton";
import adsHandler from "../utils/features/adsHandler";
import isNull from "../utils/validators/isNull";

export default function TermsPage({ type }) {
  const {
    menuData,
    isPWAOnIOS,
    termsOfUse,
    setTermsOfUse,
    privacyPolicy,
    setPrivacyPolicy,
  } = useContext(AppContexts);
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    adsHandler();
  }, [showSection]);

  useEffect(() => {
    setShowSection(false);

    let res;

    (async () => {
      if (type === "tos") {
        if (isNull(termsOfUse.body)) {
          res = await getRequest("/document/terms-of-use");
          setTermsOfUse(res.data);
        }
      } else if (type === "pp") {
        if (isNull(privacyPolicy.body)) {
          res = await getRequest("/document/privacy-policy");
          setPrivacyPolicy(res.data);
        }
      }

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
                  <h1>{termsOfUse.title}</h1>
                  <ins className="eas6a97888e37" data-zoneid="5514232"></ins>
                  <div className="last-update">
                    <p>
                      {"Last update : " +
                        new Date(termsOfUse.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className="inner-wrapper"
                    dangerouslySetInnerHTML={{ __html: termsOfUse.body }}
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
