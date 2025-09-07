import React, { useContext, useState } from "react";
import GridIcon from "../../assets/img/icons/GridIcon";
import InfoIcon from "../../assets/img/icons/InfoIcon";
import { autoXScroll, autoYScroll } from "../../utils/features/autoScroll";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function WrapperSelector() {
  const [activePart, setActivePart] = useState("videos");
  const { scrollRef, sectionScrollRef, fixedSelector } =
    useContext(ProfileContext);

  const onSelectPart = (activeBtn) => {
    if (activeBtn === "infos") {
      autoXScroll(scrollRef, scrollRef.current.scrollWidth);
      autoYScroll(sectionScrollRef, 0);
    } else {
      autoXScroll(scrollRef, 0);
    }

    setActivePart(activeBtn);
  };

  return (
    <div className={`wrapper-selector ${fixedSelector ? "absolute" : ""}`}>
      <button onClick={() => onSelectPart("videos")}>
        <GridIcon className={activePart === "videos" ? "active" : ""} />
      </button>
      <button onClick={() => onSelectPart("infos")}>
        <InfoIcon className={activePart === "infos" ? "active" : ""} />
      </button>
      <div
        className={`active-bar ${activePart === "videos" ? "left" : "right"}`}
      ></div>
    </div>
  );
}
