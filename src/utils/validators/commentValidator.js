import isURL from "validator/lib/isURL";
import isNull from "./isNull";

const commentValidator = (comment, user) => {
  if (user.isCommentLimited) {
    throw new Error(
      "Oops! It looks like you have posted too many comments. Retry later."
    );
  }
  if (user.isCommentSpammer) {
    throw new Error("You are temporarily banned from posting comments.");
  }

  if (isNull(comment)) {
    throw new Error("You must write a comment.");
  }

  if (comment.length > 200) {
    throw new Error("Your comment's length can't exceed 200 characters.");
  }

  const containUrl = comment.split(" ").some((word) =>
    isURL(word, {
      protocols: ["http", "https"],
      require_protocol: false,
    })
  );

  if (containUrl) {
    throw new Error("URL are not allowed in the comments.");
  }
};

export default commentValidator;
