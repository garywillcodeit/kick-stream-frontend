import React from "react";
import Skeleton from "react-loading-skeleton";

export default function AccountSkeleton() {
  return (
    <>
      <button className="avatar">
        <Skeleton circle height={"70px"} width={"70px"} />
      </button>
      <div className="subsection">
        <h2>Personal informations</h2>
        <div className="data-block">
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </div>
      </div>
      <div className="subsection notification">
        <h2>Notification settings</h2>
        <div className="data-block">
          <Skeleton width={"100%"} />
        </div>
      </div>
      <div className="subsection">
        <h2>Delete my account</h2>
        <Skeleton width={"100%"} />
        <Skeleton width={"100%"} />
      </div>
    </>
  );
}
