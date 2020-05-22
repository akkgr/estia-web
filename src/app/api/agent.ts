import { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "UserContext";
const history = useHistory();
const manager = useContext(UserContext);

axios.defaults.baseURL = process.env.REACT_APP_API_URL + "/api";

axios.interceptors.request.use(
  async (config) => {
    const user = await manager.getUser();
    const token = user?.access_token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//client side error handling
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error -make sure API is runnning!");
  }
  //redirect to a notfound component
  const { status, data, config } = error.response;
  if (status === 400) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error -check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Buildings = {
  list: (key: string, id: string | undefined) => requests.get(`/${key}/${id}`),
};

export default { Buildings };
