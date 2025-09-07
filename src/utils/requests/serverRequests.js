import axios from "axios";
import withCredentials from "./withCredentials";

const server = import.meta.env.VITE_SERVER_URL + "/api/v1";

export const getRequest = async (path) => {
  return await axios.get(server + path, withCredentials);
};

export const postRequest = async (path, data) => {
  return await axios.post(server + path, data, withCredentials);
};

export const putRequest = async (path, data) => {
  return await axios.put(server + path, data, withCredentials);
};

export const deleteRequest = async (path) => {
  return await axios.delete(server + path, withCredentials);
};
