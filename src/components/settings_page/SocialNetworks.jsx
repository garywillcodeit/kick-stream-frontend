import React from "react";
import InstagramIcon from "../../assets/img/icons/InstagramIcon";
import TiktokIcon from "../../assets/img/icons/TiktokIcon";
import SnapchatIcon from "../../assets/img/icons/SnapchatIcon";
import TwitterIcon from "../../assets/img/icons/TwitterIcon";
import TelegramIcon from "../../assets/img/icons/TelegramIcon";
import YoutubeIcon from "../../assets/img/icons/YoutubeIcon";
import SocialNetworkInput from "../inputs/SocialNetworkInput";
import OFIcon from "../../assets/img/icons/OFIcon";

export default function SocialNetworks() {
  return (
    <div className="subsection">
      <h2>Social networks</h2>
      <div className="social-block">
        <div className="data">
          <OFIcon />
          <SocialNetworkInput name={"onlyfans"} />
        </div>
        <div className="data">
          <InstagramIcon />
          <SocialNetworkInput name={"instagram"} />
        </div>
        <div className="data">
          <TiktokIcon />
          <SocialNetworkInput name={"tiktok"} />
        </div>
        <div className="data">
          <SnapchatIcon />
          <SocialNetworkInput name={"snapchat"} />
        </div>
        <div className="data">
          <TwitterIcon />
          <SocialNetworkInput name={"x"} />
        </div>
        <div className="data">
          <TelegramIcon />
          <SocialNetworkInput name={"telegram"} />
        </div>
        <div className="data">
          <YoutubeIcon />
          <SocialNetworkInput name={"youtube"} />
        </div>
      </div>
    </div>
  );
}
