import { Button, Grid } from "@mui/material";
import { useGetAllGames, useGetGameDetailsById } from "../Query/useQueries";
import GameCard from "../Components/GameCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GameBookingCard from "../Components/GameBookingCard";
import SlotContainer from "../Components/SlotContainer";
import { useSelector } from "react-redux";

function GameDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, refetch } = useGetGameDetailsById(id);
  const [val, setVal] = useState("");
  const userId=useSelector((state)=>state.user.userId);

  return (
    <>
      {!isLoading &&data?.data.playerInterested&& (
        <div>
          <div className="flex flex-row aline-item-center justify-center  w-full bg-slate-200">
            <GameCard data={data.data} isAllFields={true} />
          </div>

          <div className="flex flex-row aline-item-center justify-center  w-full">
            {val == "" && (
              <>
                <Button onClick={() => setVal("showBooking")}>
                  Show My Bookings
                </Button>
                <Button onClick={() => setVal("showSlots")}>Show Slots </Button>
              </>
            )}
            {val != "" && (
              <>
                <Button onClick={() => setVal("")}>close</Button>
              </>
            )}
          </div>

          <div className="flex flex-row aline-item-center justify-center  w-full bg-slate-200">
            <div>
              {val == "showBooking" &&
                data.data.gameBookings.map((gameBooking) => {
                  return <GameBookingCard data={gameBooking} refetch={refetch} />;
                })}{" "}
            </div>
          </div>
           <div className="flex flex-row aline-item-center justify-center  w-full bg-slate-200">
            <div>
          {val == "showSlots" && <SlotContainer data={data?.data.gameSlots} gameId={data?.data.gameId} refetch={refetch}/>}
          </div>
          </div>
        </div>
      )}
    </>
  );
}
export default GameDetails;
