import React, { useContext } from "react";
import interactionCounter from "../../utils/features/interactionCounter";
import FollowEditButton from "./FollowEditButton";
import LinkIcon from "../../assets/img/icons/LinkIcon";
import Picture from "../Picture";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function MainData() {
  const { profileData } = useContext(ProfileContext);

  return (
    <div className="data-wrapper">
      <div className="avatar">
        <Picture urls={profileData.avatarUrls} alt={"Avatar"} />
        <h1>{`@${profileData.username}`}</h1>
      </div>
      <div className="follow-data">
        <div>
          <p className="amount">
            {interactionCounter(profileData.followerCount)}
          </p>
          <p className="title">Followers</p>
        </div>
        <div>
          <p className="amount">
            {interactionCounter(profileData.followingCount)}
          </p>
          <p className="title">Following</p>
        </div>
        <div>
          <p className="amount">
            {interactionCounter(profileData.contentCount)}
          </p>
          <p className="title">Videos</p>
        </div>
      </div>

      <FollowEditButton />
      <div className="description-wrapper">
        <p>{profileData.description}</p>
        {profileData.website && (
          <div>
            <a href={profileData.website} target="_blank">
              <LinkIcon />
              <span>{profileData.website}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
