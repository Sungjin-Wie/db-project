import Axios from "axios";

let api = {
  url: "http://sungjin-home.iptime.org/api",
  call: Axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://sungjin-home.iptime.org/api"
        : "http://localhost:3000/api",
  }),
};

export default api;
