import isLeapYear from "./isLeapYear";

export const months = [
  { number: 1, mouth: "January" },
  { number: 2, mouth: "February" },
  { number: 3, mouth: "March" },
  { number: 4, mouth: "April" },
  { number: 5, mouth: "May" },
  { number: 6, mouth: "June" },
  { number: 7, mouth: "July" },
  { number: 8, mouth: "August" },
  { number: 9, mouth: "September" },
  { number: 10, mouth: "October" },
  { number: 11, mouth: "November" },
  { number: 12, mouth: "December" },
];

const thirtyDaysMonths = [4, 6, 9, 11];

export const years = () => {
  const firstYear = 1900;
  const yearsList = [];

  const currentYear = new Date(Date.now()).getFullYear();

  for (let i = firstYear; i <= currentYear; i++) {
    yearsList.push(i);
  }

  return yearsList.reverse();
};

const daysDefiner = (number) => {
  const daysList = [];

  for (let i = 1; i <= number; i++) {
    daysList.push(i);
  }

  return daysList;
};

export const getCalendarDays = (
  month = new Date(Date.now()).getMonth() + 1,
  year = new Date(Date.now()).getFullYear()
) => {
  if (thirtyDaysMonths.includes(month)) {
    return daysDefiner(30);
  } else if (month === 2 && isLeapYear(year)) {
    return daysDefiner(29);
  } else if (month === 2 && !isLeapYear(year)) {
    return daysDefiner(28);
  } else {
    return daysDefiner(31);
  }
};
