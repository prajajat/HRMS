
//job config 

import { instance } from "../../Api/Axios";

export const updateSystemConfigWithDocument = async (configKey: string, file: File) => {
  const formData = new FormData();
  formData.append('configKey', configKey);
  formData.append('file', file);
  return await instance.post("/job/system-config-update-docs", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }).then((res) => res);
};

export const getSystemConfig = async () =>
  await instance.get("/job/config").then((res) => res);

export const updateSystemConfig = async (data: any) =>
  await instance.patch("/job/config", data).then((res) => res);





export const getAllNotification = async () =>
  await instance.get("/api/user/notification/all").then((res) => res);

export const getNewNotificationCount = async () =>
  await instance.get("/api/user/notification/count").then((res) => res);

export const loginApi = async (data: any) =>
  await instance.post("/auth/login", data).then((res) => res);


export const Refresh = async () =>
  await instance.get("/auth/refreshToken/").then((res) => res);


export const getALLUser = async () =>
  await instance.get(`/api/user/all`).then((res) => res);

export const getAllEmp = async () =>
  await instance.get("/api/user/employee/all").then((res) => res);