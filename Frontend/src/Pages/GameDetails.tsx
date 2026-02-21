import { Button, CircularProgress } from "@mui/material";
import { useGetGameDetailsById } from "../Query/useQueries";
import GameCard from "../Components/GameCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GameBookingCard from "../Components/GameBookingCard";
import SlotContainer from "../Components/SlotContainer";
import { useSelector } from "react-redux";

function GameDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, refetch } = useGetGameDetailsById(id);
  const [view, setView] = useState("");
  const userId = useSelector((state) => state.user.userId);

  return (
    <div className="p-4">
      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 rounded">
          <p>Failed to load game details</p>
        </div>
      )}

      {!isLoading && data?.data?.playerInterested && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-100 rounded">
            <GameCard data={data.data} isAllFields={true} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setView("")}
            >
              Overview
            </Button>
            <Button
              onClick={() => setView("showBooking")}>
              My Bookings
            </Button>
            <Button
              onClick={() => setView("showSlots")}
            >
              Available Slots
            </Button>
          </div>

          {view === "showBooking" && (
            <div className="p-4 bg-slate-100 rounded">
              {data.data.gameBookings && data.data.gameBookings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.data.gameBookings.map((gameBooking) => (
                    <GameBookingCard
                      key={gameBooking.gameBookingId}
                      data={gameBooking}
                      refetch={refetch}
                    />
                  ))}
                </div>
              ) : (
                <p className="py-4">No bookings yet</p>
              )}
            </div>
          )}

          {view === "showSlots" && (
            <div className="p-4 bg-slate-100 rounded">
              <SlotContainer
                data={data?.data.gameSlots}
                gameId={data?.data.gameId}
                maxPlayer={data?.data.maxPlayerPerSlot}
                maxSlot={data?.data.maxSlotPerBooking}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default GameDetails;