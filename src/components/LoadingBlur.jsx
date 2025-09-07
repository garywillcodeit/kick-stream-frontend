import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/lotties/loading.json";

export default function LoadingBlur({ isLoadingPage }) {
  return (
    <div className={`loading ${isLoadingPage ? "visible" : ""}`}>
      <Lottie animationData={loading} className="lottie" />
    </div>
  );
}
