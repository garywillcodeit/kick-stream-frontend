const status503Handler = (error) => {
  const { response } = error;

  if (response?.data?.maintenanceOn) {
    location.reload(true);
  }
};

export default status503Handler;
