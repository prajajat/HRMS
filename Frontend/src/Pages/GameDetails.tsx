import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetGameDetailsById } from "../Query/useQueries";
import GameCard from "../Components/GameCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GameBookingCard from "../Components/GameBookingCard";
import SlotContainer from "../Components/SlotContainer";
import { useSelector } from "react-redux";
import SlotCard from "../Components/SlotCard";

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
          <div className="p-4 flex flex-row justify-center bg-slate-100 rounded">
            <GameCard data={data.data} isAllFields={true} />

            <div className="flex flex-col justify-center item-center gap-2">
              <Button onClick={() => setView("overview")}>Overview</Button>
              <Button onClick={() => setView("showBooking")}>
                My Bookings
              </Button>
              <Button onClick={() => setView("showSlots")}>
                Available Slots
              </Button>
            </div>
          </div>

          {view === "showBooking" && (
            <div className="p-4 flex flex-row justify-center bg-slate-100 rounded ">
              <div>
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
                setView={setView}
              />
            </div>
          )}

          {view === "overview" && (
            <div className="p-4 flex flex-row justify-center bg-slate-100 rounded ">
              <div>
                <p>Upcoming Slot</p>
                {data?.data.upcomingSlot != null ? (
                  <SlotCard data={data?.data.upcomingSlot} />
                ) : (
                  <p>No slot found for next 30 mins.</p>
                )}
                <p>Upcoming Team</p>
                {data?.data.upcomingPlayers != null ? (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.data.upcomingPlayers.map((player) => {
                      return (
                        <Card
                          sx={{
                            maxWidth: 200,
                            backgroundColor: "#94b5ee",
                            margin: 5,
                          }}
                          key={player.userId}
                        >
                          <div className="flex flex-row justify-center w-full">
                            <img
                              src={player.imageUrl}
                              className="h-10 w-10 m-2"
                            ></img>
                          </div>

                          <CardContent>
                            <div className="flex flex-row justify-center w-full">
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {player.name.toUpperCase()}
                              </Typography>
                            </div>
                            <hr />
                            <Typography
                              sx={{ fontSize: 18, mb: 1.5 }}
                              variant="h5"
                              color="text.secondary"
                            >
                              {player.companyEmail}
                            </Typography>

                            <Typography
                              sx={{ fontSize: 18, mb: 1.5 }}
                              variant="h5"
                              color="text.secondary"
                            >
                              Dept :{player.departmentName?player.departmentName:'N/A' }
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <p>No team playing in next 30 mins.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default GameDetails;
