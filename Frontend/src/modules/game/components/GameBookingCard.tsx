import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
 
import { useState } from "react";
 
import { useCancelBooking } from "../../../Query/useQueries";
import SlotCard from "./SlotCard";

function GameBookingCard({ data, refetch }) {

const { mutate, isPending, isError, error,} = useCancelBooking();
 
const [view, setView] = useState("");
const userId = useSelector((state) => state.user.userId);

var color = "green";
  switch (data.status) {
    case "BOOKED":
      color = "bg-green-200";
      break;
    case "PENDING":
      color = "bg-blue-200";
      break;
    case "QUEUED":
      color = "bg-blue-200";
      break;
    case "CANCELLED":
      color = "bg-red-300";
      break;
    default:
      color = "bg-red-200";
  }
 //functions
   const handleCancel = (id) => {
    mutate(
      { id: id },
      {
        onSuccess: (response: any) => {
          alert(response.data.message);

          refetch();
        },
      },
    );
  };
  return (
    <div>
      <Card sx={{ maxWidth: 300, margin: 5 }}>
        <div className="flex flex-col aline-item-center justify-center h-full ">
          <div className="flex flex-row aline-item-center justify-between w-full">
            <div>{data.gameBookingId}</div>
            <div className={color}>{data.status}</div>
          </div>

          <hr />
          {data.createdBy != null && (
            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> Created By </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {userId == data.createdBy.userId ? (
                  <div>you</div>
                ) : (
                  data.createdBy.name + " - " + data.createdBy.companyEmail
                )}
              </div>
            </div>
          )}
          <div className="flex flex-row aline-item-center justify-center  w-full">
            {view == "" && (
              <>
                <Button
                  color="secondary"
                  onClick={() => setView("showParticipants")}
                  className="bg-blue-100"
                >
                  Show participants
                </Button>
                <Button color="secondary" onClick={() => setView("showSlots")}>
                  Show Slots of booking{" "}
                </Button>
              </>
            )}
            {view != "" && (
              <>
                <Button color="secondary" onClick={() => setView("")}>
                  close
                </Button>
              </>
            )}
          </div>
          <div className="bg-blue-300">
            {view == "showParticipants" &&
              data.participants.map((p) => {
                return (
                  <div className="border-b-2 bg-blue-200 rounded-lg border-indigo-500 flex flex-row justify-items-center w-full m-5">
                    <div>{p.name + " - " + p.companyEmail}</div>
                  </div>
                );
              })}
          </div>
          <div className="bg-blue-300">
            {view == "showSlots" &&
              data.bookingSlots.map((s) => {
                return <SlotCard data={s} />;
              })}
          </div>
          {data.createdBy != null && userId == data.createdBy.userId&& (data.status=="BOOKED"||data.status=="QUEUED")&& (
            <Button
              color="error"
              onClick={() => handleCancel(data.gameBookingId)}
            >
              Cancel booking
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
export default GameBookingCard;
 
