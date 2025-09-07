import React, { useEffect } from "react";
import adsHandler from "../../utils/features/adsHandler";

export default function RightNavBar() {
  useEffect(() => {
    adsHandler();
  }, [window.AdProvider]);

  return (
    <section className={`right-nav`}>
      <h2>Ads</h2>
      <ins className="eas6a97888e20" data-zoneid="5514194"></ins>
    </section>
  );
}
