const textLimiter = (text, limit = 1000) => {
  return text.split("").slice(0, limit).join("");
};
export default textLimiter;
