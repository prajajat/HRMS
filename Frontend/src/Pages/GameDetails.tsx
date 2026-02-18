import { Button, Grid } from "@mui/material";
import { useGetAllGames, useGetGameDetailsById } from "../Query/useQueries";
import GameCard from "../Components/GameCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GameBookingCard from "../Components/GameBookingCard";
import SlotContainer from "../Components/SlotContainer";

function GameDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, refetch } = useGetGameDetailsById(id);
  const [val, setVal] = useState("");

  return (
    <>
      {!isLoading && (
        <div>
          <div className="flex flex-row aline-item-center justify-center  w-full">
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

          <div className="flex flex-row aline-item-center justify-center  w-full">
            <div>
              {val == "showBooking" &&
                data.data.gameBookings.map((gameBooking) => {
                  return <GameBookingCard data={gameBooking} />;
                })}{" "}
            </div>
          </div>
          {val == "showSlots" && <SlotContainer data={data?.data.gameSlots} />}
        </div>
      )}
    </>
  );
}
export default GameDetails;
