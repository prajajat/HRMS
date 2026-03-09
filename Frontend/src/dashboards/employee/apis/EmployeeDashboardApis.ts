import { instance } from "../../../Api/Axios";

export const getEmpDashboardInfo = async () =>
  await instance.get(`/api/user/employee/dashboard`).then((res) => res);