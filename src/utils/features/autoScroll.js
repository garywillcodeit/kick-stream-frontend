export const autoXScroll = (ref, left) => {
  if (ref?.current) {
    ref.current.scrollTo({
      left,
      behavior: "smooth",
    });
  }
};

export const autoYScroll = (ref, top) => {
  if (ref?.current) {
    ref.current.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};
