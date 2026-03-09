import { instance } from "../../../Api/Axios";

export const getGameConfigById = async (id) =>
  await instance.get("/game/config/" + id).then((res) => res);


export const updateGameConfig = async (data: any) =>
  await instance.put("/game/", data).then((res) => res);



export const getALLGames = async () =>
  await instance.get(`/game/all`).then((res) => res);

export const getGameDetailsById = async (id) =>
  await instance.get(`/game/` + id).then((res) => res);

export const CreateBooking = async (data: any) =>
  await instance.post("/game/booking", data).then((res) => res);

export const cancelBooking = async (id) =>
  await instance.delete(`/game/booking/` + id).then((res) => res);

export const updateInterest = async (data) =>
  await instance.post(`/game/interest`,data).then((res) => res);
