const pluralize = (word, count) => {
  if (count > 1) return `${word}s`;
  else return word;
};

export default pluralize;
