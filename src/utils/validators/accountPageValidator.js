import { isEmail } from "validator";
import isNull from "./isNull";
import isURL from "validator/lib/isURL";
import capitalize from "../features/capitalize";
import isValidImage from "./isValidImage";
import getRealImageMimetype from "../features/getRealImageMimetype";

export const changeAvatarValidator = async (file, isUploadAllowed) => {
  if (!isUploadAllowed) {
    throw new Error("Avatar uploads are not allowed for the moment.");
  }

  if (!file || !file.size) {
    throw new Error("You should select an image first.");
  }

  if (file.size > 20 * 1024 * 1024) {
    throw new Error("This image is too eavy (20Mo max).");
  }

  let mimetype = await getRealImageMimetype(file);

  if (
    ![
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ].includes(mimetype)
  ) {
    throw new Error("The image format must be JPEG, PNG, AVIF or WEBP.");
  }

  await isValidImage(file);

  return mimetype;
};

export const contactDataValidator = (user) => {
  let { social, website, contactEmail, description } = user;

  if (!isNull(description)) {
    if (description.trim().length > 100) {
      throw new Error(
        "The description can't be more than 200 characters long."
      );
    }
  }

  Object.entries(social).map(([key, value]) => {
    if (!isNull(value)) {
      if (value.trim().length > 100) {
        throw new Error(
          `The username for ${capitalize(key)} seems to be way too long.`
        );
      }
    }
  });

  if (!isNull(website)) {
    if (website.trim().length > 100) {
      throw new Error("The website URL seems to be way too long.");
    }

    if (!isURL(website)) {
      throw new Error(`The website URL is incorrect.`);
    }
  }

  if (!isNull(contactEmail)) {
    if (contactEmail.trim().length > 100) {
      throw new Error(`The contact email seems to be way too long.`);
    }

    if (!isEmail(contactEmail)) {
      throw new Error(`The contact email is incorrect.`);
    }
  }
};
