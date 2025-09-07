import toast from "react-hot-toast";
import status403Handler from "./status403Handler";
import status503Handler from "./status503Handler";

const errorManager = (error) => {
  const { response, message, status } = error;
  let returnedMsg = null;

  if (status === 403) {
    returnedMsg = status403Handler(error);
  } else if (status === 503) {
    status503Handler(error);
  } else if (response?.data?.msg) {
    returnedMsg = response.data.msg;
  } else if (response && response?.data) {
    returnedMsg = response.data;
  } else if (message) {
    returnedMsg = message;
  } else if (typeof error === "string") {
    returnedMsg = error;
  } else {
    returnedMsg = "Unknown error. Please, contact support.";
  }

  if (returnedMsg) {
    toast.error(returnedMsg);
  }
};

export default errorManager;
