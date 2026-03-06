import {
  Button,
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useGetGameConfigById, useUpdateGameConfig } from "../../../Query/useQueries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function GameConfig() {
  const { id } = useParams();

  const { isLoading, data } = useGetGameConfigById(id);
  const { mutate, isPending, isError } = useUpdateGameConfig();

  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { data },
  });

  //functions 
  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);


  const onSubmit = async (formData: any) => {
    mutate(formData);
  };

  return (
    <div className="p-4 flex items-center justify-center min-h-96">
      {isLoading &&data?.data ? (
        <CircularProgress />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-4 border border-gray-300 rounded-lg bg-white space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Game Configuration</h2>

          {isError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">Failed to update configuration</p>
            </div>
          )}

          <FormControl fullWidth size="small">
             <label>Slot Start Time</label>
            <Input
              type="time"
              {...register("slotStartTime", {
                required: "Please enter slot start time",
              })}
              placeholder="Slot Start Time"
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <label>Slot End Time</label>
            <Input
              type="time"
              {...register("slotEndTime", {
                required: "Please enter slot end time",
              })}
              placeholder="Slot End Time"
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <label>Slot Duration (minutes)</label>
            <Input
              type="number"
              {...register("slotDurationMinutes", {
                required: "Please enter slot duration",
                min: { value: 0, message: "Must be positive" },
              })}
              placeholder="Slot Duration (minutes)"
            />
          </FormControl>

          <FormControl fullWidth size="small">
             <label>Max Players Per Slot</label>
            <Input
              type="number"
              {...register("maxPlayerPerSlot", {
                required: "Please enter max players per slot",
                min: { value: 0, message: "Must be positive" },
              })}
              placeholder="Max Players Per Slot"
            />
          </FormControl>

          <FormControl fullWidth size="small">
           <label>Max Slots Per Booking</label>
            <Input
              type="number"
              {...register("maxSlotPerBooking", {
                required: "Please enter max slots per booking",
                min: { value: 0, message: "Must be positive" },
              })}
              placeholder="Max Slots Per Booking"
            />
          </FormControl>

          <FormControl fullWidth size="small">
           <label>Max Days Allowed for Booking</label>
            <Input
              type="number"
              {...register("maxDayOfBookingAllow", {
                required: "Please enter max days for booking",
                min: { value: 0, message: "Must be positive" },
              })}
              placeholder="Max Days Allowed for Booking"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormControlLabel
              control={<Checkbox {...register("isOpenForWeekend")} />}
              label="Open for Weekend"
            />
          </FormControl>

          <Input
            type="hidden"
            value={id}
            {...register("gameId")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      )}
    </div>
  );
}
export default GameConfig;