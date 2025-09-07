import React from "react";
import { Helmet } from "react-helmet";
import helmetDataDefiner from "../utils/features/helmetDataDefiner";

export default function PageHelmet({ metaType, data }) {
  const metaData = helmetDataDefiner(metaType, data);

  return (
    <>
      {metaData.follow ? (
        <Helmet>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta property="og:title" content={metaData.title} />
          <meta property="og:description" content={metaData.description} />
          <meta property="og:image" content={metaData.imageUrl} />
          <meta property="og:url" content={metaData.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaData.title} />
          <meta name="twitter:description" content={metaData.description} />
          <meta name="twitter:image" content={metaData.imageUrl} />
          <meta name="robots" content="index, follow" />
        </Helmet>
      ) : (
        <Helmet>
          <title>{metaData.title}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
      )}
    </>
  );
}
