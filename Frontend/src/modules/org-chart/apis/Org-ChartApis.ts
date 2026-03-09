import { instance } from "../../../Api/Axios";

 export const getUserById = async (id) =>
  await instance.get(`/api/user/${id}`).then((res) => res);