import { useMutation, useQuery } from "@tanstack/react-query";
import { AssignTravelEmp, CreateDocument, CreateExpense, CreateTravel, getAllCurrencies, getAllExpence, getAllTravelDetails, getCurrencyInINR, getDocuments, getDocumentsByManager, getDocumentsBytraveler, getExpenceBytraveler, getTravelByUser, getTravelDetailsById, patchExpense, RemoveTravelEmp } from "../apis/TravelApi";
import queryClient from "../../../Query/Client";

export const useCreateTravel = () => {
  return useMutation({
    mutationFn: CreateTravel,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useAssignTravelEmp = () => {
 // console.log("okok");
  return useMutation({
    mutationFn: AssignTravelEmp,
    onSuccess: (response) => {
      console.log(response);

      //queryClient.invalidateQueries(["travel"]);
    },
  });
};

export const useCreateExpense = (id) => {
  return useMutation({
    mutationFn: CreateExpense,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries(['expense',id]);
    },
  });
};


export const useCreateDocument = (id) => {
  return useMutation({
    mutationFn: CreateDocument,
    onSuccess: (response) => {
      console.log(response);
       queryClient.invalidateQueries(['travelerDoc',id]);
        queryClient.invalidateQueries(['travelerDoc-']);
    },
  });
};



export const useRemoveTravelEmp = () => {
  console.log("remove emp to travel");
  return useMutation({
    mutationFn: RemoveTravelEmp
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

export const useGetTravelByUser = () => {
  return useQuery({ queryKey: ["traveler-travel"], queryFn: getTravelByUser });
};




export const useGetExpenceBytraveler = (id, search) => {
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

export const useGetAllExpence = (id, search: String) => {
  console.log(search);
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => getAllExpence(search),
  });
};

export const useGetDocumentsBytraveler = (id) => {
  return useQuery({
    queryKey: ["travelerDoc", id],
    queryFn: () => getDocumentsBytraveler(id),
    enabled: !!id,
  });
};

export const useGetDocuments = () => {
  return useQuery({ queryKey: ["travelerDoc-"], queryFn: getDocuments });
};



export const useGetTravelById = (id) => {
  return useQuery({
    queryKey: ["travel-", id],
    queryFn: () => getTravelDetailsById(id),
    enabled: !!id,
  });
};


export const useGetCurrencyInINR = () => {
  return useQuery({
    queryKey: ["INR"],
    queryFn: getCurrencyInINR,
    staleTime: 1000,
  });
};
export const useGetAllCurrencies = () => {
  return useQuery({
    queryKey: ["AllCurrency"],
    queryFn: getAllCurrencies,
    staleTime: 5*60*1000,
  });
};