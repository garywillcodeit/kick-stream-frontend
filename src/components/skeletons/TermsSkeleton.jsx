import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TermsSkeleton() {
  return (
    <section className={`section term-section`}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <h1>{<Skeleton height={"2rem"} width={"20vw"} />}</h1>
        <div className="last-update">
          <p>{<Skeleton width={"100%"} />}</p>
        </div>
        <div className="inner-wrapper">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <p key={i}>
                <Skeleton width={"100%"} />
              </p>
            ))}
        </div>
        <div className="last-update">
          <p>{<Skeleton width={"100%"} />}</p>
        </div>
        <div className="inner-wrapper">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <p key={i}>
                <Skeleton width={"100%"} />
              </p>
            ))}
        </div>
      </SkeletonTheme>
    </section>
  );
}
