import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
} from "@mui/material";
import { useCreateTravel, useGetAllTravel } from "../Query/useQueries";
import TravelDetailCard from "../Components/TravelDetailCard";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { isPending } from "@reduxjs/toolkit";
import { useState } from "react";

function TravelDetails() {
  const { isLoading, data, isError, refetch } = useGetAllTravel();
  const userId = useSelector((state) => state.user.userId);
  const [addState, setAddState] = useState(false);

  const {
    mutate,
    isPending: isPendingCreate,
    isError: isErrorCreate,
    error,
  } = useCreateTravel();
  useCreateTravel;
  console.log(data);
  console.log(isError);
  var isPending = false;

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (dto) => {
    console.log(dto);
    mutate(dto, {
      onSuccess: (response) => {
        console.log(response);
        refetch();
      },
    });
  };

  return (
    <div  >
      All Travels
      {addState && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  border p-20 rounded-lg w-100 "
        >
          <FormControl>
            <InputLabel htmlFor="my-input">title </InputLabel>
            <Input
              type="text"
              className="mt-10 mb-10 "
              {...register("title", {
                required: "Please enter title",
              })}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input"> description</InputLabel>
            <Input
              type="text"
              className="mt-10 mb-10 "
              {...register("description", {
                required: "Please enter description",
              })}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input"> max amount per day</InputLabel>
            <Input
              type="number"
              className="mt-10 mb-10 "
              {...register("maxAmoutPerDay", {
                required: "Please enter maxAmoutPerDay",
                min: { value: 0, message: "min value is 0" },
              })}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">startDate</InputLabel>
            <Input
              type="datetime-local"
              className="mt-10 mb-10 "
              {...register("startDate", {
                required: "Please enter startDate",
              })}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">endDate</InputLabel>
            <Input
              type="datetime-local"   
              className="mt-10 mb-10 "
              {...register("endDate", {
                required: "Please enter endDate",
              })}
            />
          </FormControl>

          <FormControl>
            <Input
              type="number"
              className="mt-10 mb-10 "
              hidden
              value={userId}
              {...register("creadtedBy", {
                required: "Please enter creadtedBy",
              })}
            />
          </FormControl>

          <Button type="submit">
            {isPending ? "submiting..." : "add new travel"}
          </Button>
        </form>
      )}
      {
        <Button onClick={() => setAddState(!addState)}>
          {addState ? "cancle" : "add new travel"}
        </Button>
      }
        
      {!isLoading && (
       <Grid container spacing={2}>
          {data.data.map((td) => {
            return (
               <Grid item xs={12} md={4} key={td.travelDetailsId}>
                <TravelDetailCard data={td} />{" "}
             </Grid>
            );
          })}
          </Grid>
        
      )}
    </div>
  );
}
export default TravelDetails;
