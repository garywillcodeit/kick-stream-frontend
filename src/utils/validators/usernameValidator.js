const usernameAuthChars = "abcdefghijklmnopqrstuvwxyz0123456789_.";

const usernameValidator = (username) => {
  username = username.trim();

  if (username.trim().length > 20) {
    throw new Error("The username can't exceed 20 characters.");
  }

  if (username.endsWith(".")) {
    throw new Error("The username can't end with a period '.'");
  } else if (username.startsWith(".")) {
    throw new Error("The username can't start with a period '.'");
  }

  for (let char of username) {
    if (!usernameAuthChars.includes(char))
      throw new Error(
        "Only lower case letters, digits, underscores and periods, are authorized."
      );
  }
};

export default usernameValidator;
