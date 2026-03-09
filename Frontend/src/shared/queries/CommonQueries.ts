import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllEmp, getAllNotification, getALLUser, getNewNotificationCount, getSystemConfig, loginApi, Refresh, updateSystemConfig, updateSystemConfigWithDocument } from "../apis/CommonApis";
import queryClient from "../../Query/Client";

//job config 
export const useGetSystemConfig = () => {
  return useQuery({
    queryKey: ["systemConfig"],
    queryFn: () => getSystemConfig().then((res) => res.data),
  });
};

export const useUpdateSystemConfig = () => {
  return useMutation({
    mutationFn: updateSystemConfig,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useUpdateSystemConfigWithDocument = () => {
  return useMutation({
    mutationFn: ({ configKey, file }: { configKey: string; file: File }) =>
      updateSystemConfigWithDocument(configKey, file),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["systemConfig"] });
    },
  });
};


export const useLogin = () => {
  console.log("jiji");
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log(response);

      // queryClient.invalidateQueries(['profile']
    },
  });
};


export const useGetALLUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: getALLUser });
};

export const useRefresh = () => {
  return useQuery({ queryKey: ["refresh", Date.now], queryFn: Refresh });
};

export const useGetAllNotification = () => {
  return useQuery({ queryKey: ["notification"], queryFn: getAllNotification });
};

export const useGetNewNotificationCount = () => {
  return useQuery({ queryKey: ["notificationCount"], queryFn: getNewNotificationCount });
};


export const useGetAllEmp = () => {
  return useQuery({ queryKey: ["allemp"], queryFn: getAllEmp });
};