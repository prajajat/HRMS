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

import { Navigate, useNavigate } from "react-router-dom";
import { useUpdateInterest } from "../../../Query/useQueries";
import { useSelector } from "react-redux";

function GameCard({ data, isAllFields = false, view }) {

  const { mutate: updateMutation, isPending: isUpdateLoading } =useUpdateInterest();
   
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  var image = "";
  switch (data.gameId) {
    case 1:
      image = "/POOL.jpg";
      break;
    case 2:
      image = "/CHESS.jpg";
      break;
    case 3:
      image = "/FOOSBALL.jpg";
      break;
    case 4:
      image = "/Carrom.jpg";
      break;
  }

  const handleUpdateGameInterest = () => {
    const updateData = {
      userId: userId,
      game: data.gameId,
    };
    updateMutation(updateData, {
      onSuccess: (response: any) => {
        console.log("interest updated", response);

        alert("interest updated!");
      },
    });
  };
 
  return (
    <div className="max-w-4xl m-5 shadow-lg bg-blue-100 rounded-lg p-4">
      <div className="flex flex-row aline-item-center justify-center h-full">
        <div className="flex flex-col  aline-item-center justify-center w-full">
          <img src={image} className="h-50 "></img>
          <div className=" m-3 bg-blue-200 rounded-sm">{data.gameName}</div>
        </div>

        <div className="flex flex-col aline-item-center justify-center w-full">
          <div className="flex flex-row bg-blue-100 m-1 h-10 justify-between w-sm">
            <div className=" m-3 rounded-sm"> Slot Start Time </div>
            <div className=" m-3 rounded-sm">
              {" "}
              {data.slotStartTime}
            </div>
          </div>

          <div className=" flex flex-row bg-blue-200 m-1 h-10 justify-between w-sm">
            <div className=" m-3 rounded-sm"> Slot End Time </div>
            <div className=" m-3 rounded-sm">
              {" "}
              {data.slotEndTime}
            </div>
          </div>

          <div className=" flex flex-row bg-blue-100  m-1 h-10 justify-between w-sm">
            <div className=" m-3 rounded-sm">
              {" "}
              Max Player Per Slot{" "}
            </div>
            <div className=" m-3 rounded-sm">
              {" "}
              {data.maxPlayerPerSlot}
            </div>
          </div>
          <div className=" flex flex-row bg-blue-200 m-1 h-10 justify-between w-sm">
            <div className=" m-3 rounded-sm">
              {" "}
              Slot Duration Minutes{" "}
            </div>
            <div className=" m-3 rounded-sm">
              {" "}
              {data.slotDurationMinutes}
            </div>
          </div>

          <div className=" flex flex-row bg-blue-100 m-1 h-10 justify-between w-sm">
            <div className=" m-3 rounded-sm">
              {" "}
              Max Slot Per Booking{" "}
            </div>
            <div className=" m-3 rounded-sm">
              {" "}
              {data.maxSlotPerBooking}
            </div>
          </div>

          {isAllFields && (
            <div>
              <div className=" flex flex-row bg-blue-200 m-1 h-10 justify-between w-sm">
                <div className=" m-3 rounded-sm">
                  {" "}
                  Cycle Start Date{" "}
                </div>
                <div className=" m-3 rounded-sm">
                  {" "}
                  {data.cycleStartDate}
                </div>
              </div>
              <div className=" flex flex-row bg-blue-100 m-1 h-10 justify-between w-sm">
                <div className=" m-3 rounded-sm">
                  {" "}
                  Cycle End Date{" "}
                </div>
                <div className=" m-3 rounded-sm">
                  {" "}
                  {data.cycleEndDate}
                </div>
              </div>
              {!data.isOpenForWeekend && (
                <div className=" flex flex-row bg-blue-200 m-1 h-10justify-between w-sm">
                  <div className="bg-green-100 m-3 rounded-sm">
                    {" "}
                    Open for weekend
                  </div>
                </div>
              )}
            </div>
          )}

          {data.playerInterested && !isAllFields && (
            <Button
              onClick={() => navigate("/employee/game/details/" + data.gameId)}
            >
              See More
            </Button>
          )}
          {!data.playerInterested && !isAllFields && (
            <Button onClick={handleUpdateGameInterest}>Show interest</Button>
          )}
          {view == "hr" && (
            <Button onClick={() => navigate("/hr/game/details/" + data.gameId)}>
              Config
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default GameCard;
