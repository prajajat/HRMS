import { instance } from "../../../Api/Axios";

export const getHrDashboardInfo = async () =>
  await instance.get(`/api/user/hr/dashboard`).then((res) => res);