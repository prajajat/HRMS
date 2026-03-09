import axios from "axios";
import { store } from "../Store/Store.ts";

export const instance = axios.create({
  baseURL: "http://localhost:8089",
  timeout: 10000,

  withCredentials: true,
});
export const instanceForCurrencies = axios.create({
  baseURL: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/",
  timeout: 10000,
 
});
 
instance.interceptors.request.use((config) => {
  console.log(config.url);
  const state = store.getState();
  if (
    state.tokens.token != null &&
    config.url != "/auth/login" &&
    config.url != "/auth/refreshToken/"
  ) {
    //console.log("set");
    config.headers.Authorization = `Bearer ${state.tokens.token}`;
    //console.log(config.headers.Authorization);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.status == 5001) {
      window.open("http://localhost:5173/refresh");
      return Promise.reject(error);
    } else {
      if(error.response.data.msg.length>50){
        alert("internal error");
      }
      else{
      alert(error.response.data.msg);
      }
       return Promise.reject(error);
    }
  },
);
