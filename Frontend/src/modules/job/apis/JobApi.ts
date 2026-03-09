import { instance } from "../../../Api/Axios"; 

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

export const getAllHr= async () =>
  await instance.get("/api/user/hr/all").then((res) => res);


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



export const updateReferralStatus = async (data: any) =>
  await instance.post("/job/refer/review", data).then((res) => res);

 