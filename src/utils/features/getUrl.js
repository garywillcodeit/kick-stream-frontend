import { frontendUrl } from "../data/files";

export const getUrlFromSlug = (slug) => {
  return frontendUrl + "/content/" + slug;
};

export const getProfileUrl = (username) => {
  if (username && !username.startsWith("@")) {
    username = "@" + username;
  }
  return frontendUrl + "/" + username;
};
