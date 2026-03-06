import {
  Button,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useCreateTravel,
  useGetAllCurrencies,
  useGetAllTravel,
  useGetCurrencyInINR,
} from "../../../Query/useQueries";
 
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import TravelDetailCard from "../Components/TravelDetailCard";

function TravelDetails() {
  
  const { isLoading, data, isError, refetch } = useGetAllTravel();
  const {isLoading: isLoadingAllCurrencies,data: dataAllCurrencies,isError: isErrorAllCurrencies,} = useGetAllCurrencies();
  const {isLoading: isLoadingINR,data: dataINR,isError: isErrorINR,} = useGetCurrencyInINR();
  const { mutate, isPending: isPendingCreate } = useCreateTravel();
  
  const userId = useSelector((state) => state.user.userId);
  const [addState, setAddState] = useState(false);
  const [amountInINR, setAmountInINR] = useState(0);
  const {register,handleSubmit,watch,formState: { errors },} = useForm({ mode: "onSubmit",});
  const watchAmount = watch("maxAmoutPerDay");
  const watchCurrency = watch("currency", "inr");


  //functions
  const Converter = () => {
    //console.log(dataINR?.data.inr);
   // console.log(dataINR?.data.inr[watchCurrency], watchCurrency);
    if(isLoadingINR||isErrorINR)return;
    return watchAmount / dataINR?.data.inr[watchCurrency];
  };

  const onSubmit = (dto) => {
    if (dto.endDate < dto.startDate) {
      alert("start date must be before end date");
      return;
    }
    dto.amount = amountInINR;
    mutate(dto, {
      onSuccess: (response) => {
        refetch();
        setAddState(false);
        alert("new travel added successfully");
        setAddState(false);
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Travels</h2>

      <button
        onClick={() => setAddState(!addState)}
        className="mb-4 px-4 py-2 bg-blue-300  rounded hover:bg-blue-300"
      >
        {addState ? "Cancel" : "Add new travel"}
      </button>

      {addState && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 p-4 border border-gray-300 rounded-lg bg-white space-y-4 max-w-md"
        >
          <FormControl fullWidth size="small">
            <label>Title</label>
            <Input
              type="text"
              {...register("title", { required: "Please enter title" })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <label>Description</label>
            <Input
              type="text"
              {...register("description", {
                required: "Please enter description",
              })}
            />
          </FormControl>
           {isErrorAllCurrencies && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-600">
                      Failed to load 
                    </p>
                  </div>
                )}

          <FormControl fullWidth size="small">
            <div className="flex flex-row justify-between w-full">
              <div>
                <label>Max amount per day</label>
                <p className="text-green-800 text-sm">
                  in INR {Math.round(100 * amountInINR) / 100}
                </p>
              </div>
              <div>
                <label>Currency</label>
                 {isErrorAllCurrencies && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-600">
                      Failed to load 
                    </p>
                  </div>
                )}
                {!isLoadingAllCurrencies&& dataAllCurrencies?.data &&
                <Select
                  type="text"
                  defaultValue=""
                  className="m-2"
                  {...register("currency")}
                  onBlur={() => {
                    //console.log(watchCurrency);
                    setAmountInINR(Converter());
                  }}
                >
                  <MenuItem value={"inr"}>
                    {" "}
                    {dataAllCurrencies?.data.inr}
                  </MenuItem>
                  <MenuItem value={"aud"}>
                    {" "}
                    {dataAllCurrencies?.data.aud}
                  </MenuItem>
                  <MenuItem value={"eur"}>
                    {" "}
                    {dataAllCurrencies?.data.eur}
                  </MenuItem>
                  <MenuItem value={"jpy"}>
                    {" "}
                    {dataAllCurrencies?.data.jpy}
                  </MenuItem>
                  <MenuItem value={"mxn"}>
                    {" "}
                    {dataAllCurrencies?.data.mxn}
                  </MenuItem>
                  <MenuItem value={"cad"}>
                    {" "}
                    {dataAllCurrencies?.data.cad}
                  </MenuItem>
                </Select>
}
              </div>
            </div>
            <Input
              type="number"
              defaultValue={0}
              {...register("maxAmoutPerDay", {
                required: "Please enter maxAmoutPerDay",
                min: { value: 0, message: "min value is 0" },
              })}
              onBlur={() => {
                //console.log(watchAmount);
                setAmountInINR(Converter());
              }}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <label>Start Date</label>
            <Input
              type="datetime-local"
              {...register("startDate", {
                required: "Please enter startDate",
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <label>End Date</label>
            <Input
              type="datetime-local"
              {...register("endDate", { required: "Please enter endDate" })}
            />
          </FormControl>

          <input type="hidden" value={userId} {...register("creadtedBy")} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPendingCreate}
          >
            {isPendingCreate ? "Submitting..." : "Add new travel"}
          </Button>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </form>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load travels</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No travels found</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {data.data.map((td) => (
            <TravelDetailCard key={td.travelDetailsId} data={td} />
          ))}
        </div>
      )}
    </div>
  );
}
export default TravelDetails;
