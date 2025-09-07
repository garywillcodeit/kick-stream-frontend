import isEmail from "validator/lib/isEmail";
import isNull from "./isNull";

const contactUsFormValidator = (data, userData) => {
  const { name, email, selectSubject, otherSubject, body } = data;

  if (!userData.isLogged) {
    if (isNull(name)) return "You must write your name.";

    if (name.trim().length > 100)
      return "The written name is too long (100 characters max).";

    if (isNull(email)) return "You must write your email.";

    if (!isEmail(email)) return "The email format is incorrect.";

    if (email.trim().length > 100)
      return "The email is too long (100 characters max).";
  }

  if (isNull(selectSubject)) return "You must select a subject.";

  if (selectSubject !== "other") {
    if (selectSubject.trim().length > 100) {
      return;
      ("Problem found with the selected subject. Please, retry.");
    }
  } else {
    if (isNull(otherSubject)) return "You must specify a subject.";

    if (otherSubject.trim().length > 100) {
      return "The subject is too long (100 characters max).";
    }
  }

  if (isNull(body)) return "You must write a message.";

  if (body.trim().length > 1000)
    return "The message is too long (1000 characters max).";
};

export default contactUsFormValidator;
