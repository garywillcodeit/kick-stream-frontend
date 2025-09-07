const indexesAdding = (list) => {
  return list.map((item, index) => {
    return { ...item, index };
  });
};

export default indexesAdding;
