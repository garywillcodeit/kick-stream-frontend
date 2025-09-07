import React from "react";
import Skeleton from "react-loading-skeleton";
import GridIcon from "../../assets/img/icons/GridIcon";
import InfoIcon from "../../assets/img/icons/InfoIcon";

export default function UserProfileSkeleton() {
  return (
    <section className="section user-profile-section">
      <div className="data-wrapper">
        <div className="avatar">
          <Skeleton circle height={"70px"} width={"70px"} />
          <Skeleton />
        </div>
        <div className="follow-data">
          <div>
            <p className="amount">
              <Skeleton height={"30px"} width={"60px"} />
            </p>
            <p className="title">Followers</p>
          </div>
          <div>
            <p className="amount">
              <Skeleton height={"30px"} width={"60px"} />
            </p>
            <p className="title">Following</p>
          </div>
          <div>
            <p className="amount">
              <Skeleton height={"30px"} width={"60px"} />
            </p>
            <p className="title">Tiz</p>
          </div>
        </div>

        <Skeleton height={"100px"} />
        <div className="description-wrapper">
          <Skeleton />
        </div>
      </div>
      <div className="home-content-wrapper">
        <div className={`wrapper-selector`}>
          <button>
            <GridIcon className="active" />
          </button>
          <button>
            <InfoIcon />
          </button>
          <div className={`active-bar left`}></div>
        </div>
        <div className="scroll-wrapper">
          <div className="content-grid">
            {new Array(12).fill(0).map((e, i) => (
              <Skeleton key={i} height={"250px"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
