import {
  Button,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useCreateTravel, useGetAllTravel } from "../Query/useQueries";
import TravelDetailCard from "../Components/TravelDetailCard";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";

function TravelDetails() {
  const { isLoading, data, isError, refetch } = useGetAllTravel();
  const userId = useSelector((state) => state.user.userId);
  const [addState, setAddState] = useState(false);

  const { mutate, isPending: isPendingCreate } = useCreateTravel();
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (dto) => {
    mutate(dto, {
      onSuccess: (response) => {
        refetch();
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
            <InputLabel>Title</InputLabel>
            <Input
              type="text"
              {...register("title", { required: "Please enter title" })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Description</InputLabel>
            <Input
              type="text"
              {...register("description", {
                required: "Please enter description",
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Max amount per day</InputLabel>
            <Input
              type="number"
              {...register("maxAmoutPerDay", {
                required: "Please enter maxAmoutPerDay",
                min: { value: 0, message: "min value is 0" },
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Start Date</InputLabel>
            <Input
              type="datetime-local"
              {...register("startDate", {
                required: "Please enter startDate",
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>End Date</InputLabel>
            <Input
              type="datetime-local"
              {...register("endDate", { required: "Please enter endDate" })}
            />
          </FormControl>

          <Input
            type="hidden"
            value={userId}
            {...register("creadtedBy", {
              required: "Please enter creadtedBy",
            })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPendingCreate}
          >
            {isPendingCreate ? "Submitting..." : "Add new travel"}
          </Button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((td) => (
            <TravelDetailCard key={td.travelDetailsId} data={td} />
          ))}
        </div>
      )}
    </div>
  );
}
export default TravelDetails;