import isNull from "./isNull";

const reportMessageValidator = (message) => {
  if (isNull(message)) {
    throw new Error("You must write a message.");
  }

  if (message.trim().length < 50) {
    throw new Error(
      "Your message must be at least 50 characters long for precision."
    );
  }

  if (message.trim().length > 1000) {
    throw new Error("The message's length can't exceed 1000 characters.");
  }
};

export default reportMessageValidator;
