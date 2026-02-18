import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginApi,
  getAllTravelDetails,
  getTravelDetailsById,
  getAllEmp,
  AssignTravelEmp,
  RemoveTravelEmp,
  getTravelByUser,
  CreateTravel,
  getExpenceBytraveler,
  getDocumentsBytraveler,
  CreateExpense,
  CreateDocument,
  getDocuments,
  getAllExpence,
  patchExpense,
  getALLUser,
  getUserById,
  getDocumentsByManager,
  Refresh,
  getALLGames,
  getGameDetailsById,
} from "../Api/Axios";
import queryClient from "./Client";

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

export const useCreateTravel = () => {
  return useMutation({
    mutationFn: CreateTravel,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useAssignTravelEmp = () => {
  console.log("okok");
  return useMutation({
    mutationFn: AssignTravelEmp,
    onSuccess: (response) => {
      console.log(response);

      //queryClient.invalidateQueries(["travel"]);
    },
  });
};

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: CreateExpense,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useCreateDocument = () => {
  return useMutation({
    mutationFn: CreateDocument,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useRemoveTravelEmp = () => {
  console.log("remove emp to travel");
  return useMutation({
    mutationFn: RemoveTravelEmp,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const usePatchExpense = () => {
  console.log("patch expense");
  return useMutation<any, any, any>({
    mutationFn: ({ eId, userId, dto }) => patchExpense(eId, userId, dto),
    onSuccess: (response) => {
      console.log(response);
      // queryClient.invalidateQueries("expences");
    },
  });
};

export const useGetAllTravel = () => {
  return useQuery({ queryKey: ["travel"], queryFn: getAllTravelDetails });
};
export const useRefresh = () => {
  return useQuery({ queryKey: ["refresh", Date.now], queryFn: Refresh });
};

export const useGetTravelByUser = () => {
  return useQuery({ queryKey: ["traveler-travel"], queryFn: getTravelByUser });
};

export const useGetAllEmp = () => {
  return useQuery({ queryKey: ["allemp"], queryFn: getAllEmp });
};

export const useGetExpenceBytraveler = (id) => {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: () => getExpenceBytraveler(id),
    enabled: !!id,
  });
};

export const useGetDocumentByManager = (id) => {
  return useQuery({
    queryKey: ["documentsByManager", id],
    queryFn: () => getDocumentsByManager(id),
    enabled: !!id,
  });
};

export const useGetAllExpence = (id) => {
  return useQuery({ queryKey: ["expenses"], queryFn: getAllExpence });
};

export const useGetDocumentsBytraveler = (id) => {
  return useQuery({
    queryKey: ["travelerDoc", id],
    queryFn: () => getDocumentsBytraveler(id),
    enabled: !!id,
  });
};

export const useGetDocuments = () => {
  return useQuery({ queryKey: ["travelerDoc"], queryFn: getDocuments });
};
export const useGetTravelById = (id) => {
  return useQuery({
    queryKey: ["travel", id],
    queryFn: () => getTravelDetailsById(id),
    enabled: !!id,
  });
};

export const useGetALLUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: getALLUser });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useGetAllGames = () => {
  return useQuery({ queryKey: ["games"], queryFn: getALLGames });
};

export const useGetGameDetailsById = (id) => {
  return useQuery({
    queryKey: ["gamedetails", id],
    queryFn: () => getGameDetailsById(id),
    enabled: !!id,
  });
};
