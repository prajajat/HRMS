import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TravelerCard from "./TravelerCard";

function EmpTravelDetailCard({ data, isSeeMore = true }) {

  const navigator = useNavigate();

 // console.log(data);
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{  margin:5,backgroundColor:"#dbeafe"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <hr />

          {data.description}

          <div className="flex flex-row justify-between bg-blue-100 m-1 h-10 w-full">
              <div className="  rounded-sm"> Created Name </div>
              <div className="  rounded-sm">
                {data.createdName}
              </div>
            </div>

            <div className="flex flex-row justify-between  bg-blue-200 m-1 h-10 w-full">
              <div className="  rounded-sm"> Max Amout Per Day </div>
              <div className=" rounded-sm">
                {data.maxAmountPerDay}
              </div>
            </div>

           
            <div className="flex flex-row justify-between bg-blue-100 m-1 h-10 w-full">
              <div className=" rounded-sm"> Start Date </div>
              <div className=" rounded-sm">
                
                {data.startDate.replace("T", ",")}
              </div>
            </div>

            <div className="flex flex-row justify-between bg-blue-200 m-1 h-10 w-full">
              <div className=" rounded-sm"> End Date </div>
              <div className=" rounded-sm"> {data.endDate.replace("T", ",")}</div>
            </div>

            <div className="flex flex-row justify-between bg-blue-100 m-1 h-10 w-full">
              <div className="   rounded-sm"> Created At </div>
              <div className="   rounded-sm">{data.createdAt.replace("T", ",")}</div>
            </div>

            <div className="flex flex-row justify-between  bg-blue-200 m-1 h-10 w-full">
              <div className="   rounded-sm"> Updated At </div>
              <div className="  rounded-sm">{data.updateAt?data.updateAt.replace("T", ",") :"N/A"}</div>
            </div>

         
          <div className="">
            <div className="bg-gray-300">travelers</div>
            <List>
              {data.travelers.map((t) => {
                return (
                  <ListItem key={t.travelerUserId}>
                    <TravelerCard
                      data={t}
                      travelDetailsId={undefined}
                      refetch={undefined}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </CardContent>
        <CardActions>
          {isSeeMore && (
            <Button
              size="small"
              onClick={() =>
                navigator(
                  "/employee/travel/details/" +
                    data.travelerId +
                    "?tid=" +
                    data.travelDetailId,
                )
              }
            >
              see more
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
export default EmpTravelDetailCard;