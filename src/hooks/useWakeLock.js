export default function useWakeLock() {
  let wakeLock = null;

  const requestWakeLock = async () => {
    try {
      if (navigator.wakeLock) {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Screen locked!");
      }
    } catch (err) {
      console.error("Wake Lock request failed:", err);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLock !== null) {
      wakeLock.release();
      wakeLock = null;
    }
  };
  return { requestWakeLock, releaseWakeLock };
}
