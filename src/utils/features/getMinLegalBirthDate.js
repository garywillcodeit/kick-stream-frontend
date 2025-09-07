const getMinLegalBirthDate = () => {
  const dateNow = new Date(Date.now());
  const year = dateNow.getFullYear();
  return new Date(dateNow.setYear(year - 18));
};

export default getMinLegalBirthDate;
