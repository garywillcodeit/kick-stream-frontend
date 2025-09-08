import { frontendUrl } from "../../config/app.config";

export const getUrlFromSlug = (slug) => {
  return frontendUrl + "/content/" + slug;
};

export const getProfileUrl = (username) => {
  if (username && !username.startsWith("@")) {
    username = "@" + username;
  }
  return frontendUrl + "/" + username;
};
