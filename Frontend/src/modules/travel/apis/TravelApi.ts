import { instance, instanceForCurrencies } from "../../../Api/Axios";

export const getAllCurrencies = async () =>
  await instanceForCurrencies.get("currencies.json").then((res) =>{return  res;});

export const getCurrencyInINR= async () =>
  await instanceForCurrencies.get("currencies/inr.json").then((res) => res);

export const CreateTravel = async (data: any) =>
  await instance.post("/api/travel/details", data).then((res) => res);

export const AssignTravelEmp = async (data: any) =>
  await instance.post("/api/travel/details/employee", data).then((res) => res);

export const CreateExpense = async (data: any) =>
  await instance.post("/api/travel/expense", data).then((res) => res);

export const CreateDocument = async (data: any) =>
  await instance.post("/api/travel/document", data).then((res) => res);

export const RemoveTravelEmp = async (data) =>
  await instance
    .delete(`/api/travel/details/${data.travelId}/employee/${data.empId}`)
    .then((res) => res);

    
export const getAllTravelDetails = async () =>
  await instance.get("/api/travel/details/all").then((res) => res);

export const getTravelDetailsById = async (id) =>
  await instance.get("/api/travel/details/" + id).then((res) => res);


export const getTravelByUser = async () =>
  await instance.get("/api/travel/details/traveler/all").then((res) => res);


export const getExpenceBytraveler = async (id) =>
  await instance.get("/api/travel/expense/all/" + id).then((res) => res);

export const getAllExpence = async (search: String) =>
  await instance.get("/api/travel/expense/all" + search).then((res) => res);

export const patchExpense = async (eId, userId, dto) =>
  await instance
    .patch(`/api/travel/expense/${eId}/user/${userId}`, dto)
    .then((res) => res);

export const getDocumentsBytraveler = async (id) =>
  await instance
    .get("/api/travel/document/traveler/all/" + id)
    .then((res) => res);


    
export const getDocumentsByManager = async (id) =>
  await instance.get("/api/travel/document/manager/" + id).then((res) => res);



export const getDocuments = async () =>
  await instance.get("/api/travel/document/uploader/all/").then((res) => res);