import toast from "react-hot-toast";

const status403Handler = (error) => {
  const { response } = error;

  if (response?.data?.hasMaliciousContent) {
    toast.error(response.data.msg);
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } else if (response?.data?.msg && isXML(response.data.msg)) {
    return "You are not authorized to access these resources.";
  }
};

export default status403Handler;
