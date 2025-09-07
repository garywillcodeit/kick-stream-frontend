import React from "react";
import swipeUp from "../../../assets/lotties/swipeUp.json";
import Lottie from "lottie-react";

export default function Error404({ ctn, index, refs }) {
  return (
    <div id={ctn._id} className="page-wrapper error-404">
      <h1>404</h1>
      <h2>NOT FOUND</h2>
      <p>{`You are looking for a ${ctn.contentType} that does not exist.`}</p>
      <Lottie animationData={swipeUp} loop={true} className="lottie" />
      <div
        ref={(el) => (refs.current[index] = el)}
        className="content-detector"
        data-ctn-id={ctn._id}
        data-index={index}
      ></div>
    </div>
  );
}
