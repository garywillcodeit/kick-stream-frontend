import React from "react";
import { defaultAvatarUrl } from "../utils/data/files";

export default function Picture({ alt, className, urls, onClick }) {
  return (
    <>
      {urls?.upload ? (
        <img src={urls?.upload} alt="" />
      ) : (
        <picture onClick={onClick}>
          <source srcSet={urls?.avif || urls?.avifSmall} type="image/avif" />
          <source srcSet={urls?.webp || urls?.webpSmall} type="image/webp" />
          <img
            src={urls?.jpeg || urls?.jpegSmall || defaultAvatarUrl}
            alt={alt}
            className={className}
          />
        </picture>
      )}
    </>
  );
}
