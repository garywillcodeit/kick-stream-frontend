import { isNull } from "lodash";
import isEmail from "validator/lib/isEmail";

const h24 = 1000 * 60 * 60 * 24;

export const requestEmailUpdateValidator = (user) => {
  const { email, newEmail, lastEmailUpdate, password } = user;

  if (lastEmailUpdate) {
    const timestamp = Date.parse(lastEmailUpdate);

    if (timestamp + h24 > Date.now()) {
      throw new Error("You have reached the daily email update limit.");
    }
  }

  if (isNull(newEmail)) {
    throw new Error("You must write a new email.");
  }

  if (!isEmail(newEmail)) {
    throw new Error("The new email's format is incorrect.");
  }

  if (newEmail.trim() === email.trim()) {
    throw new Error("The new email and the current one can't be the same.");
  }

  if (isNull(password)) {
    throw new Error("You must write a password.");
  }
};

export const changeNewEmailValidator = (newEmail, email) => {
  if (newEmail.trim() === email.trim()) {
    return "The new email and the current one can't be the same.";
  }
};

export const isEmailUpdateAllowed = (user) => {
  const { lastEmailUpdate } = user;
  if (lastEmailUpdate) {
    const timestamp = Date.parse(lastEmailUpdate);

    if (timestamp + h24 > Date.now()) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
