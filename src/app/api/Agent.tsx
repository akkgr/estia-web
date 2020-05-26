import { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../UserContext";
import { Building } from "app/models/Building";

axios.defaults.baseURL = process.env.REACT_APP_API_URL + "/api";
const Agent = () => {
  const history = useHistory();
  const manager = useContext(UserContext);
  axios.interceptors.request.use(
    async (config) => {
      const user = await manager.getUser();
      const token = user?.access_token;
      if (!user || user?.expired) {
        toast.error(
          "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε."
        );
      } else {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //client side error handling
  axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
      history.push("/dashboard");
      return toast.error("Network error -make sure API is runnning!");
    }
    //redirect to a notfound component
    const { status, data, config } = error.response;
    if (status === 400) {
      history.push("/notfound");
      return toast.error("Bad request!");
    }
    if (
      status === 400 &&
      config.method === "get" &&
      data.errors.hasOwnProperty("id")
    ) {
      history.push("/notfound");
      return toast.error("Bad request!");
    }
    if (status === 404) {
      return toast.error("The request contained an invalid :path value!");
    }
    if (status === 500) {
      return toast.error("Server error -check the terminal for more info!");
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
    view: (
      key: string,
      page: number,
      rows: number,
      s: string,
      f: string
    ): Promise<any> =>
      requests.get(`/${key}?sort=${s}&page=[${page},${rows}]&filter=${f}`),
    list: (key: string, id: string | undefined): Promise<Building> =>
      requests.get(`/${key}/${id}`),
    delete: (entity: string, id: string) => requests.del(`/${entity}/${id}`),
  };

  const Apartments = {
    data: (key: string, id: string | undefined) =>
      requests.get(`/${key}/${id}`),
    update: (key: string, id: string, input: any) =>
      requests.put(`/${key}/${id}`, input),
    new_update: (key: string, input: any) => requests.put(`/${key}`, input),
  };
  return { Buildings, Apartments };
};
export default Agent;
