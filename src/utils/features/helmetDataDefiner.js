import { isNull } from "lodash";
import helmetMetaInit from "../data/helmetMetaInit";
import { defaultAvatarUrl } from "../data/files";

const { VITE_FRONTEND_URL } = import.meta.env;

export default function helmetDataDefiner(metaType, data) {
  let newMetaData;

  switch (metaType) {
    case "content":
      newMetaData = contentHelmetDefiner(data);
      break;

    case "home":
      newMetaData = homeHelmetDefiner();
      break;

    case "discover":
      newMetaData = discoverHelmetDefiner();
      break;

    case "likes":
      newMetaData = likesHelmetDefiner();
      break;

    case "contact-us":
      newMetaData = contactHelmetDefiner();
      break;

    case "tos":
      newMetaData = tosHelmetDefiner();
      break;

    case "privacy":
      newMetaData = privacyHelmetDefiner();
      break;

    case "login":
      newMetaData = loginHelmetDefiner();
      break;

    case "signup":
      newMetaData = signupHelmetDefiner();
      break;

    case "error-404":
      newMetaData = error404HelmetDefiner();
      break;

    case "profile":
      newMetaData = profileHelmetDefiner(data);

    default:
      newMetaData = noFollowHelmetDefiner();
  }

  return newMetaData;
}

function contentHelmetDefiner(data) {
  let newMetaData = { ...helmetMetaInit };
  const { title, categories, thumbnailUrl, slug } = data;
  newMetaData.title = title + " - TizMe";

  let description = "";

  categories.forEach((e, i) => {
    if (i === 0) description += `${title} - `;
    description += e.name;

    if (i === categories.length - 1) description += ".";
    else description += `, `;
  });
  newMetaData.description = description;
  newMetaData.imageUrl = thumbnailUrl;
  newMetaData.url = `${VITE_FRONTEND_URL}/content/${slug}`;
  newMetaData.follow = true;

  return newMetaData;
}

function homeHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "TizMe - The #1 adult scrolling content app";
  newMetaData.description =
    "Tizme offers you a better way to watch adult content. Stop spending hours looking for the best video, it appears on your screen after only one swipe.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL;
  newMetaData.follow = true;

  return newMetaData;
}

function discoverHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Discover - TizMe";
  newMetaData.description =
    "Check out the best adult videos that will make you cum fastest than finding a good video on another platform.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/discover";
  newMetaData.follow = true;
  return newMetaData;
}

function contactHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Contact us - TizMe";
  newMetaData.description =
    "Need to tell us something ? You can contact us using our contact form.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/contact-us";
  newMetaData.follow = true;
  return newMetaData;
}

function tosHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Terms of use - TizMe";
  newMetaData.description =
    "TizMe website is intended for an adult audience only. Check out the Terms of use before any use of this website.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/terms-of-use";
  newMetaData.follow = true;
  return newMetaData;
}

function privacyHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Privacy policy - TizMe";
  newMetaData.description = "Check out the TizMe's privacy policy.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/privacy-policy";
  newMetaData.follow = true;
  return newMetaData;
}

function loginHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Login - TizMe";
  newMetaData.description = "Log into your TizMe account.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/login";
  newMetaData.follow = true;
  return newMetaData;
}

function signupHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "Signup - TizMe";
  newMetaData.description = "Create a Tizme account.";
  newMetaData.imageUrl = `${VITE_FRONTEND_URL}/img/logo/logo.svg`;
  newMetaData.url = VITE_FRONTEND_URL + "/signup";
  newMetaData.follow = true;
  return newMetaData;
}

function likesHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "My likes - TizMe";
  newMetaData.follow = false;
  return newMetaData;
}

function noFollowHelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "TizMe";
  newMetaData.follow = false;
  return newMetaData;
}

function error404HelmetDefiner() {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = "404 error - TizMe";
  newMetaData.follow = false;
  return newMetaData;
}

function profileHelmetDefiner(data) {
  let newMetaData = { ...helmetMetaInit };
  newMetaData.title = `@${data.username} - TizMe`;

  newMetaData.url = VITE_FRONTEND_URL + "/@" + data.username;
  newMetaData.follow = true;

  if (isNull(data.description)) {
    newMetaData.description = `@${data.username} TizMe profile`;
  } else {
    data.description;
  }

  if (data?.avatarUrls?.jpeg) {
    newMetaData.imageUrl = data.avatarUrls.jpeg;
  } else {
    newMetaData.imageUrl = defaultAvatarUrl;
  }

  return newMetaData;
}
