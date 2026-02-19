import {
  Button,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useGetGameConfigById, useUpdateGameConfig } from "../Query/useQueries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
 
function GameConfig() {
    
    const {id}=useParams();
     const { isLoading, data} = useGetGameConfigById(id);
  const { register, handleSubmit,reset } = useForm({
    shouldUseNativeValidation: true,defaultValues:{data}
  });

  useEffect(()=>{
    if(data?.data)
    {
        reset(data.data);
    }
  },[data,reset]);
  const { mutate, isPending, isError, error } = useUpdateGameConfig();


  const onSubmit = async (data: any) => {
    console.log(data);
    mutate(data, {
      onSuccess: (response: any) => {
         
      },
    });
  };
  return (
    
    <div className="w-100 align-middle flex flex-row justify-center items-center">
        { ! isLoading &&
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  border p-20 rounded-lg "
      >
        <FormControl>
          <InputLabel htmlFor="my-input">slot Start Time</InputLabel>
          <Input
            type="time"
          
            className="mt-10 mb-10 "
            {...register("slotStartTime", {
              required: "Please enter slot Start Time",

            })}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">slot End Time </InputLabel>
          <Input
            type="time"
            
            className="mt-10 mb-10 "
            {...register("slotEndTime", {
              required: "Please enter slot End Time ",

            })}
          />
        </FormControl>

         <FormControl>
          <InputLabel htmlFor="my-input"> slot Duration Minutes </InputLabel>
          <Input
            type="number"
            className="mt-10 mb-10 "
            {...register("slotDurationMinutes", {
              required: "Please enter slot Duration Minutes ",
               min: { value: 0, message: " slot Duration Minutes must be positive" },
            })}
          />
        </FormControl>

         <FormControl>
          <InputLabel htmlFor="my-input"> max Player Per Slot</InputLabel>
          <Input
            type="number"
            className="mt-10 mb-10 "
            {...register("maxPlayerPerSlot", {
              required: "Please enter max Player Per Slot ",
               min: { value: 0, message: " max Player Per Slot must be positive" },
            })}
          />
        </FormControl>

         <FormControl>
          <InputLabel htmlFor="my-input"> max Slot Per Booking</InputLabel>
          <Input
            type="number"
            className="mt-10 mb-10 "
            {...register("maxSlotPerBooking", {
              required: "Please enter max Slot Per Booking   ",
               min: { value: 0, message: " max Slot Per Booking must be positive" },
            })}
          />
        </FormControl>


       <FormControl>
          <InputLabel htmlFor="my-input"> max Day Of Booking Allow</InputLabel>
          <Input
            type="number"
            className="mt-10 mb-10 "
            {...register("maxDayOfBookingAllow", {
              required: "Please enter max Day Of Booking Allow   ",
               min: { value: 0, message: " max Day Of Booking Allow must be positive" },
            })}
          />
        </FormControl>

        <FormControl>
          <FormControlLabel control={
            <Checkbox {...register("isOpenForWeekend")}
          />
        }
          label="open for Weekend" />
       
        </FormControl>

         <FormControl>
        <Input
          type="number"
          hidden
          className="mt-10 mb-10"
          value={id}
          {...register("gameId")}
        />
      </FormControl>
        <Button type="submit">{isPending ? "submiting..." : "Update"}</Button>
        
      </form>
}
    </div>
    
  );
}
export default GameConfig;
// {
//   "gameId": 9007199254740991,
//   "slotStartTime": "2026-02-19T16:26:41.624Z",
//   "slotEndTime": "2026-02-19T16:26:41.624Z",
//   "slotDurationMinutes": 1073741824,
//   "maxPlayerPerSlot": 1073741824,
//   "maxSlotPerBooking": 1073741824,
//   "isOpenForWeekend": true,
//   "maxDayOfBookingAllow": 1073741824
// }