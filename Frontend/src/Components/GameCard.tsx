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

function GameCard({ data, isAllFields = false,view}) {
  const navigate = useNavigate();
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
 
  console.log(data);
  return (
    <Card sx={{ maxWidth: 250, margin: 5 }}>
      <div className="flex flex-col aline-item-center justify-center h-full">
        <div className="flex flex-row aline-item-center justify-center w-full">
          <img src={image} className="h-20 w-20"></img>
        </div>
        <div className="flex flex-row aline-item-center justify-center  w-full">
          <div className="bg-gray-100 m-3 rounded-sm">{data.gameName}</div>
        </div>
        <hr />
        <div className="flex flex-row justify-items-stretch">
          <div className="bg-gray-100 m-3 rounded-sm"> slotStartTime </div>
          <div className="bg-gray-100 m-3 rounded-sm">
            {" "}
            {data.slotStartTime}
          </div>
        </div>
        <div className="flex flex-row justify-items-stretch">
          <div className="bg-gray-100 m-3 rounded-sm"> slotEndTime </div>
          <div className="bg-gray-100 m-3 rounded-sm"> {data.slotEndTime}</div>
        </div>
        <div className="flex flex-row justify-items-stretch">
          <div className="bg-gray-100 m-3 rounded-sm"> maxPlayerPerSlot </div>
          <div className="bg-gray-100 m-3 rounded-sm">
            {" "}
            {data.maxPlayerPerSlot}
          </div>
        </div>
        <div className="flex flex-row justify-items-stretch">
          <div className="bg-gray-100 m-3 rounded-sm">
            {" "}
            slotDurationMinutes{" "}
          </div>
          <div className="bg-gray-100 m-3 rounded-sm">
            {" "}
            {data.slotDurationMinutes}
          </div>
        </div>

        <div className="flex flex-row justify-items-stretch">
          <div className="bg-gray-100 m-3 rounded-sm"> maxSlotPerBooking </div>
          <div className="bg-gray-100 m-3 rounded-sm">
            {" "}
            {data.maxSlotPerBooking}
          </div>
        </div>
        <hr />
        {data.playerInterested && !isAllFields && (
          <Button
            onClick={() => navigate("/employee/game/details/" + data.gameId)}
          >
            See More
          </Button>
        )}

         {view=="hr" && (
          <Button
            onClick={() => navigate("/hr/game/details/" + data.gameId)}
          >
            Config
          </Button>
        )}

        

        {isAllFields && (
          <div>
            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> cycleStartDate </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {" "}
                {data.cycleStartDate}
              </div>
            </div>
            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> cycleEndDate </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {" "}
                {data.cycleEndDate}
              </div>
            </div>
            {!data.isOpenForWeekend && (
              <div className="flex flex-row justify-items-stretch">
                <div className="bg-green-100 m-3 rounded-sm">
                  {" "}
                  Open for weekend
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
export default GameCard;
