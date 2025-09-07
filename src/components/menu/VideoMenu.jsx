import React from "react";
import { useContext } from "react";
import ContactUsButton from "./menu_buttons/ContactUsButton";
import ReportButton from "./menu_buttons/ReportButton";
import ShareButton from "./menu_buttons/ShareButton";
import { getUrlFromSlug } from "../../utils/features/getUrl";
import TermOsUseButton from "./menu_buttons/TermOsUseButton";
import PrivacyPolicyButton from "./menu_buttons/PrivacyPolicyButton";
import { ScrollContentContext } from "../../contexts/ScrollContentContext";
import DislikeButton from "./menu_buttons/DislikeButton";
import InstallAppButton from "./menu_buttons/InstallAppButton";
import { AppContexts } from "../../contexts/AppContext";

export default function VideoMenu() {
  const { activeContent } = useContext(ScrollContentContext);
  const { isPWA, isAndroid } = useContext(AppContexts);

  return (
    <ul className="profile">
      <ShareButton url={getUrlFromSlug(activeContent.slug)} type={"video"} />
      <DislikeButton slug={activeContent.slug} />
      <ReportButton type={"video"} itemId={activeContent._id} />
      <ContactUsButton />
      <TermOsUseButton />
      <PrivacyPolicyButton />
      {isAndroid && !isPWA && <InstallAppButton />}
    </ul>
  );
}
