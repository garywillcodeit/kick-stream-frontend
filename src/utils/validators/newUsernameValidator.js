const h24 = 1000 * 60 * 60 * 24;

export const submitNewUsernameValidator = (user) => {
  const { username, newUsername, lastUsernameUpdate } = user;
  const usernameAuthChars = "abcdefghijklmnopqrstuvwxyz0123456789_.";

  if (lastUsernameUpdate) {
    const timestamp = Date.parse(lastUsernameUpdate);

    if (timestamp + h24 > Date.now()) {
      throw new Error("You have reached the daily username update limit.");
    }
  }

  if (!newUsername || newUsername === "") {
    throw new Error("You must write a username.");
  } else if (username === newUsername) {
    throw new Error("The new username and the current one can't be the same.");
  } else if (newUsername.length > 20) {
    throw new Error("The username's length can't exceed 20 characters long.");
  } else if (newUsername.length < 3) {
    throw new Error(
      "The username's length can't be shorter than 3 characters long."
    );
  } else if (newUsername.endsWith(".")) {
    throw new Error("The username can't end with a period '.'");
  } else if (newUsername.startsWith(".")) {
    throw new Error("The username can't start with a period '.'");
  }

  for (let char of newUsername) {
    if (!usernameAuthChars.includes(char))
      throw new Error(
        "Only lower case letters, digits, underscores and periods, are authorized."
      );
  }
};

export const changeNewUsernameValidator = (newUsername, username) => {
  const usernameAuthChars = "abcdefghijklmnopqrstuvwxyz0123456789_.";

  if (!newUsername || newUsername === "") {
    return "";
  } else if (username === newUsername) {
    return "The new username and the current one can't be the same.";
  } else if (newUsername.length > 20) {
    return "The username's length can't exceed 20 characters long.";
  } else if (newUsername.length < 3) {
    return "The username's length can't be shorter than 3 characters long.";
  } else if (newUsername.endsWith(".")) {
    return "The username can't end with a period '.'";
  } else if (newUsername.startsWith(".")) {
    return "The username can't start with a period '.'";
  }

  for (let char of newUsername) {
    if (!usernameAuthChars.includes(char)) {
      return "Only lower case letters, digits, underscores and periods, are authorized.";
    }
  }

  return "";
};

export const isUsernameUpdateAllowed = (user) => {
  const { lastUsernameUpdate } = user;
  if (lastUsernameUpdate) {
    const timestamp = Date.parse(lastUsernameUpdate);

    if (timestamp + h24 > Date.now()) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
