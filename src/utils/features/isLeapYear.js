const isLeapYear = (year) => {
  if (Number.isInteger(year / 4)) {
    if (!Number.isInteger(year / 100)) {
      return true;
    } else if (Number.isInteger(year / 400)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default isLeapYear;
