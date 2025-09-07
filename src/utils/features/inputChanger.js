const inputChanger = (e) => {
  let { name, value, checked } = e.target;
  let state = {};

  if (name === "termsAcceptance") {
    state.termsAcceptance = checked;
  } else if (name === "body") {
    value = value.split("");
    value.splice(1000, Number.POSITIVE_INFINITY);
    value = value.join("");
    state[name] = value;
  } else {
    state[name] = value;
  }

  return state;
};

export default inputChanger;
