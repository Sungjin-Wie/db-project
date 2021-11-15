import Axios from "axios";

let api = {
  url: "http://db-online.kro.kr/api",
  call: Axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://db-online.kro.kr/api"
        : "http://localhost:3000/api",
  }),
};

export default api;
