const firstLetterUpper = (data) => {
  if (data) {
    data = data.split("");
    const firstLetter = data[0].toUpperCase();
    data.splice(0, 1, firstLetter);
    data = data.join("");
  }

  return data;
};

export default firstLetterUpper;
