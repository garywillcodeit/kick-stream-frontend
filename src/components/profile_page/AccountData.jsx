import React, { useContext, useEffect, useState } from "react";
import InstagramIcon from "../../assets/img/icons/InstagramIcon";
import SnapchatIcon from "../../assets/img/icons/SnapchatIcon";
import TiktokIcon from "../../assets/img/icons/TiktokIcon";
import TwitterIcon from "../../assets/img/icons/TwitterIcon";
import TelegramIcon from "../../assets/img/icons/TelegramIcon";
import MailIcon from "../../assets/img/icons/MailIcon";
import PlayEmptyIcon from "../../assets/img/icons/PlayEmptyIcon";
import LikeIcon from "../../assets/img/icons/LikeIcon";
import CommentIcon from "../../assets/img/icons/CommentIcon";
import interactionCounter from "../../utils/features/interactionCounter";
import { ProfileContext } from "../../contexts/ProfileContext";
import OFIcon from "../../assets/img/icons/OFIcon";
import YoutubeIcon from "../../assets/img/icons/YoutubeIcon";

export default function AccountData() {
  const { profileData } = useContext(ProfileContext);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    if (profileData?.social) {
      const values = Object.values(profileData.social).filter(
        (e) => e && e !== ""
      );
      setSocial(values);
    }
  }, [profileData.social]);

  return (
    <div className="account-data">
      {social.length > 0 && (
        <div className="data-bloc">
          <h2>Social network</h2>
          <ul className="social-network">
            {profileData?.social?.onlyfans && (
              <li>
                <OFIcon />
                <p>{profileData.social.onlyfans}</p>
              </li>
            )}
            {profileData?.social?.instagram && (
              <li>
                <InstagramIcon />
                <p>{profileData.social.instagram}</p>
              </li>
            )}
            {profileData?.social?.tiktok && (
              <li>
                <TiktokIcon />
                <p>{profileData.social.tiktok}</p>
              </li>
            )}
            {profileData?.social?.snapchat && (
              <li>
                <SnapchatIcon />
                <p>{profileData.social.snapchat}</p>
              </li>
            )}
            {profileData?.social?.x && (
              <li>
                <TwitterIcon />
                <p>{profileData.social.x}</p>
              </li>
            )}
            {profileData?.social?.telegram && (
              <li>
                <TelegramIcon />
                <p>{profileData.social.telegram}</p>
              </li>
            )}
            {profileData?.social?.youtube && (
              <li>
                <YoutubeIcon />
                <p>{profileData.social.youtube}</p>
              </li>
            )}
          </ul>
        </div>
      )}
      {profileData?.contactEmail && (
        <div className="data-bloc">
          <h2>Contact</h2>
          <ul className="social-network">
            <li>
              <MailIcon />
              <p>{profileData.contactEmail}</p>
            </li>
          </ul>
        </div>
      )}
      <div className="data-bloc">
        <h2>Analytics</h2>
        <ul className="analytics">
          <li>
            <PlayEmptyIcon style={{ fill: "unset" }} />
            <p>{interactionCounter(profileData.profileViewsCount)}</p>
          </li>
          <li>
            <LikeIcon />
            <p>{interactionCounter(profileData.profileLikesCount)}</p>
          </li>
          <li>
            <CommentIcon />
            <p>{interactionCounter(profileData.profileCommentsCount)}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
