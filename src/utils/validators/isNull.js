const isNull = (data) => {
  if (["", 0, undefined, NaN, null, [], {}].includes(data)) return true;
  else if (typeof data === "string" && data.trim().length === 0) return true;
  else return false;
};

export default isNull;
