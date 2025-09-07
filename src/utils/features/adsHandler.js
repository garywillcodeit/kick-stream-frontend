const adsHandler = async () => {
  const { VITE_ENV } = import.meta.env;

  if (VITE_ENV !== "development" && window.AdProvider) {
    window.AdProvider.push({ serve: {} });
  }
};

export default adsHandler;
