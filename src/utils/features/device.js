export const isMobileDevice = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const isAndroidDevice = () => {
  return /Android/i.test(navigator.userAgent);
};

export const isIOSDevice = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const getDeviceName = () => {
  for (let name of ["iPhone", "iPad", "Android"])
    if (userAgantTest(name)) {
      return name;
    }

  return null;
};

const userAgantTest = (deviceName) => {
  return new RegExp(deviceName, "i").test(navigator.userAgent);
};

export const isPWApplication = () => {
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  ) {
    return true;
  }

  return false;
};

export const isPWAonIOSDevice = () => {
  if (isIOSDevice() && isPWApplication()) {
    return true;
  } else {
    return false;
  }
};
