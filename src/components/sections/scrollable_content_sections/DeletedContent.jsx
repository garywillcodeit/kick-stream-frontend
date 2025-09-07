import swipeUp from "../../../assets/lotties/swipeUp.json";
import Lottie from "lottie-react";

export default function DeletedContent({ ctn, index, refs }) {
  return (
    <div id={ctn._id} className="page-wrapper error-404">
      <h1>DELETED</h1>
      <p>This content has been deleted.</p>
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
