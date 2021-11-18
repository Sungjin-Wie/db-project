import Axios from "axios";

let api = {
  url: "http://db-online.kro.kr/api",
  call: Axios.create({
    baseURL: "https://db-online.kro.kr/api",
  }),
};

export default api;
