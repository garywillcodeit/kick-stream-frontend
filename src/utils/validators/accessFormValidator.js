import isEmail from "validator/lib/isEmail";
import isNull from "./isNull";
import getMinLegalBirthDate from "../features/getMinLegalBirthDate";
import { minorsExitUrl } from "../data/minorsExitUrl";

const accessFormValidator = (data, accessType) => {
  const { email, password, termsAcceptance, dateOfBirth } = data;

  if (isNull(email)) throw new Error("You must write an email.");
  if (!isEmail(email)) throw new Error("The email format is incorrect.");
  if (isNull(password)) throw new Error("You must write a password.");
  if (isNull(dateOfBirth))
    throw new Error("You must define your date of birth.");

  if (dateOfBirth > getMinLegalBirthDate()) {
    window.location.href = minorsExitUrl;
    throw new Error("You are not authorized to access this website.");
  }
  if (accessType === "signup") {
    if (password.trim().length < 4)
      throw new Error("The password must be at least 4 characters long.");

    if (!termsAcceptance)
      throw new Error(
        "You must accept the terms of use and the privacy policy."
      );
  }
};

export default accessFormValidator;
