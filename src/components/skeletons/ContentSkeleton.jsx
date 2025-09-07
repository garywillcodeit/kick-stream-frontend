import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ContentSkeleton() {
  return (
    <div className="home-content-wrapper">
      <Skeleton width={"100%"} height={"100%"} />
      <div className="content-title">
        <h2></h2>
      </div>
    </div>
  );
}
