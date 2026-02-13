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

      queryClient.invalidateQueries(["travel"]);
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

export const useGetAllTravel = () => {
  return useQuery({ queryKey: ["travel"], queryFn: getAllTravelDetails });
};

export const useGetTravelByUser = () => {
  return useQuery({ queryKey: ["traveler-travel"], queryFn: getTravelByUser });
};

export const useGetAllEmp = () => {
  return useQuery({ queryKey: ["allemp"], queryFn: getAllEmp });
};

export const useGetExpenceBytraveler = (id) => {
  return useQuery({ queryKey: ["expenses",id], queryFn:()=> getExpenceBytraveler(id),enabled: !!id, });
};
export const useGetTravelById = (id) => {
  return useQuery({
    queryKey: ["travel", id],
    queryFn: () => getTravelDetailsById(id),
    enabled: !!id,
  });
};
