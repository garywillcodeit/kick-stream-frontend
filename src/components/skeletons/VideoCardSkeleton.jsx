import React from "react";
import Skeleton from "react-loading-skeleton";
import EyeOpenIcon from "../../assets/img/icons/EyeOpenIcon";
import LikeFullIcon from "../../assets/img/icons/LikeFullIcon";

export default function VideoCardSkeleton() {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={`video`}>
            <Skeleton height={"100%"} />
            <div className="data">
              <div>
                <EyeOpenIcon className={"icon"} />
              </div>
              <div>
                <LikeFullIcon />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
