import axios from "axios";
import { store } from "../Store/Store.ts";

const instance = axios.create({
  baseURL: "http://localhost:8089",
  timeout: 10000,

  withCredentials: true,
});

export const loginApi = async (data: any) =>
  await instance.post("/auth/login", data).then((res) => res);

export const CreateTravel = async (data: any) =>
  await instance.post("/api/travel/details", data).then((res) => res);

export const AssignTravelEmp = async (data: any) =>
  await instance.post("/api/travel/details/employee", data).then((res) => res);

export const CreateExpense = async (data: any) =>
  await instance.post("/api/travel/expense", data).then((res) => res);

export const Refresh = async () =>
  await instance.get("/auth/refreshToken/").then((res) => res);

export const getGameConfigById = async (id) =>
  await instance.get("/game/config/" + id).then((res) => res);

export const CreateDocument = async (data: any) =>
  await instance.post("/api/travel/document", data).then((res) => res);

export const updateGameConfig = async (data: any) =>
  await instance.put("/game/", data).then((res) => res);

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
  await instance.get("/api/travel/expense/all/" + id).then((res) => res);

export const getAllExpence = async (search: String) =>
  await instance.get("/api/travel/expense/all" + search).then((res) => res);

export const patchExpense = async (eId, userId, dto) =>
  await instance
    .patch(`/api/travel/expense/${eId}/user/${userId}`, dto)
    .then((res) => res);

export const getDocumentsBytraveler = async (id) =>
  await instance
    .get("/api/travel/document/traveler/all/" + id)
    .then((res) => res);

export const getDocumentsByManager = async (id) =>
  await instance.get("/api/travel/document/manager/" + id).then((res) => res);

export const getDocuments = async () =>
  await instance.get("/api/travel/document/uploader/all/").then((res) => res);

export const getUserById = async (id) =>
  await instance.get(`/api/user/${id}`).then((res) => res);

export const getALLUser = async () =>
  await instance.get(`/api/user/all`).then((res) => res);

export const getALLGames = async () =>
  await instance.get(`/game/all`).then((res) => res);

export const getGameDetailsById = async (id) =>
  await instance.get(`/game/` + id).then((res) => res);

export const getAllNotification = async () =>
  await instance.get("/api/user/notification/all").then((res) => res);

export const CreateBooking = async (data: any) =>
  await instance.post("/game/booking", data).then((res) => res);

export const cancelBooking = async (id) =>
  await instance.delete(`/game/booking/` + id).then((res) => res);

export const createJob = async (data: any) =>
  await instance.post("/job/create", data).then((res) => res);

export const getAllJobs = async (filters: any) =>
  await instance.get("/job/all", { params: filters }).then((res) => res);

export const updateJobStatus = async (jobId, data: any) =>
  await instance.patch(`/job/${jobId}/status`, data).then((res) => res);

export const addReviewer = async (jobId, data: any) =>
  await instance.post(`/job/${jobId}/reviewer`, data).then((res) => res);

export const addHr = async (jobId, data: any) =>
  await instance.post(`/job/${jobId}/hr`, data).then((res) => res);

export const createJobReferral = async (jobId, data: any) =>
  await instance.post(`/job/${jobId}/refer`, data).then((res) => res);

export const getActiveJobs = async (search: string = "") =>
  await instance.get("/job/active", { params: { search } }).then((res) => res);

export const getUserReferrals = async () =>
  await instance.get("/job/refers").then((res) => res);

export const getUserShares = async () =>
  await instance.get("/job/shares").then((res) => res);

export const shareJob = async (jobId, data: any) =>
  await instance.post(`/job/${jobId}/share`, data).then((res) => res);

export const getSystemConfig = async () =>
  await instance.get("/job/config").then((res) => res);

export const updateSystemConfig = async (data: any) =>
  await instance.patch("/job/config", data).then((res) => res);


instance.interceptors.request.use((config) => {
  console.log(config.url);
  const state = store.getState();
  if (
    state.tokens.token != null &&
    config.url != "/auth/login" &&
    config.url != "/auth/refreshToken/"
  ) {
    console.log("set");
    config.headers.Authorization = `Bearer ${state.tokens.token}`;
    console.log(config.headers.Authorization);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.status == 5001) {
      console.log("error");
      window.open("http://localhost:5173/refresh");
      return Promise.reject(error);
    } else {
      alert(error.response.data.msg);
    }
  },
);
