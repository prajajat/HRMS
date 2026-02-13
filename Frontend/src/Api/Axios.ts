import axios from "axios";
import { store } from "../Store/Store.ts";

const instance = axios.create({
  baseURL: "http://localhost:8089",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const loginApi = async (data: any) =>
  await instance.post("/auth/login", data).then((res) => res);

export const CreateTravel = async (data: any) =>
  await instance.post("/api/travel/details", data).then((res) => res);

export const AssignTravelEmp = async (data: any) =>
  await instance.post("/api/travel/details/employee", data).then((res) => res);

export const RemoveTravelEmp = async (data) =>
  await instance
    .delete(`/api/travel/details/${data.travelId}/employee/${data.empId}`)
    .then((res) => res);

export const getAllTravelDetails = async () =>
  await instance.get("/api/travel/details/all").then((res) => res);

export const getTravelDetailsById = async (id) =>
  await instance.get("/api/travel/details/" + id).then((res) => res);

export const getAllEmp = async () =>
  await instance.get("/api/user/employee/all").then((res) => res);

export const getTravelByUser = async () =>
  await instance.get("/api/travel/details/traveler/all").then((res) => res);

export const getExpenceBytraveler = async (id) => 
  await instance.get("/api/travel/expense/all/"+id).then((res) => res);

instance.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.tokens.token != null) {
    console.log("set");
    config.headers.Authorization = `Bearer ${state.tokens.token}`;
    console.log(config.headers.Authorization);
  }
  return config;
});

//  instance.interceptors.response.use((response) => response,
//                                      (error) => { if (error.response?.status == 5001 ) {

//                                       console.log(error.response);

//                                     }
//                                     return Promise.reject(error);
//                                   } );
