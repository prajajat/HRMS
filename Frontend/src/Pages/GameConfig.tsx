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
import { useGetGameConfigById, useUpdateGameConfig } from "../Query/useQueries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function GameConfig() {
  const { id } = useParams();
  const { isLoading, data } = useGetGameConfigById(id);
  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { data },
  });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);
  const { mutate, isPending, isError } = useUpdateGameConfig();

  const onSubmit = async (formData: any) => {
    mutate(formData);
  };

  return (
    <div className="p-4 flex items-center justify-center min-h-96">
      {isLoading ? (
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
            <InputLabel>Slot Start Time</InputLabel>
            <Input
              type="time"
              {...register("slotStartTime", {
                required: "Please enter slot start time",
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Slot End Time</InputLabel>
            <Input
              type="time"
              {...register("slotEndTime", {
                required: "Please enter slot end time",
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Slot Duration (Minutes)</InputLabel>
            <Input
              type="number"
              {...register("slotDurationMinutes", {
                required: "Please enter slot duration",
                min: { value: 0, message: "Must be positive" },
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Max Players Per Slot</InputLabel>
            <Input
              type="number"
              {...register("maxPlayerPerSlot", {
                required: "Please enter max players per slot",
                min: { value: 0, message: "Must be positive" },
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Max Slots Per Booking</InputLabel>
            <Input
              type="number"
              {...register("maxSlotPerBooking", {
                required: "Please enter max slots per booking",
                min: { value: 0, message: "Must be positive" },
              })}
            />
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Max Days for Booking</InputLabel>
            <Input
              type="number"
              {...register("maxDayOfBookingAllow", {
                required: "Please enter max days for booking",
                min: { value: 0, message: "Must be positive" },
              })}
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