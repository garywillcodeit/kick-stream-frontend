import { useContext, useEffect, useState } from "react";
import adsHandler from "../../../utils/features/adsHandler";
import LoadingBlur from "../../LoadingBlur";
import indexesAdding from "../../../utils/features/indexesAdding";
import { ScrollContentContext } from "../../../contexts/ScrollContentContext";

export default function ExoClickAd({ ctn, refs, index }) {
  const { activeContent, setActiveContent, contentList, setContentList } =
    useContext(ScrollContentContext);
  const [adState, setAdState] = useState("loading");

  useEffect(() => {
    if (ctn._id === activeContent._id) {
      adsHandler();

      setTimeout(() => {
        const ref = refs.current.find(
          (e) => e.getAttribute("data-id") === ctn._id
        );

        if (ref && ref.children && ref.children[0]) {
          const exoClickDiv = ref.children[0];

          if (exoClickDiv && exoClickDiv instanceof HTMLDivElement) {
            const div = Object.values(exoClickDiv.children).find(
              (e) => e instanceof HTMLDivElement
            );

            if (!div || !div.children || div?.children.length < 2) {
              deleteExoClickAd();
            } else {
              setAdState("show");
            }
          } else if (exoClickDiv && exoClickDiv instanceof HTMLModElement) {
            deleteExoClickAd();
          }
        }
      }, 2000);
    }
  }, [activeContent]);

  const deleteExoClickAd = () => {
    let nextContent = contentList.find((e) => e.index === ctn.index + 1);

    if (nextContent) {
      let contents = [...contentList].filter((e) => e._id !== ctn._id);
      contents = indexesAdding(contents);
      nextContent = contents.find((e) => e._id === nextContent._id);

      setContentList(contents);
      setActiveContent(nextContent);
    }
  };

  return (
    <div
      className="exoclickad-scroll-component"
      data-id={ctn._id}
      data-index={index}
      ref={(el) => (refs.current[index] = el)}
    >
      {ctn._id === activeContent._id && (
        <div className="inner-wrapper">
          <ins className="eas6a97888e20" data-zoneid={ctn.zone}></ins>
          <LoadingBlur isLoadingPage={adState === "loading"} />
        </div>
      )}
    </div>
  );
}
