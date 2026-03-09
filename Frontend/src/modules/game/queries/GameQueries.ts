import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelBooking, CreateBooking, getALLGames, getGameConfigById, getGameDetailsById, updateGameConfig, updateInterest } from "../apis/GameApis";


export const useCancelBooking = () => {
  return useMutation<any>({
    mutationFn: ({ id }) => cancelBooking(id),
    onSuccess: (response) => {
      response;
    },
  });
};


export const useUpdateGameConfig = () => {
  return useMutation({
    mutationFn: updateGameConfig,
    onSuccess: (response) => {
      alert(response.data.message);
    },
  });
};


export const useGetGameConfigById = (id) => {
  return useQuery({
    queryKey: ["gameConfig", id],
    queryFn: () => getGameConfigById(id),
  });
};



export const useGetGameDetailsById = (id) => {
  return useQuery({
    queryKey: ["gamedetails", id],
    queryFn: () => getGameDetailsById(id),
    enabled: !!id,
  });
};

export const useUpdateInterest = () => {
  return useMutation({
    mutationFn: updateInterest,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};


export const useCreateBooking = () => {
  return useMutation({
    mutationFn: CreateBooking,
    onSuccess: (response) => {
      alert(response.data.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};


export const useGetAllGames = () => {
  return useQuery({ queryKey: ["games"], queryFn: getALLGames });
};
