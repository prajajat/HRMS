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
import TravelerCard from "./TravelerCard";

function TravelDetailCard({ data, isSeeMore = true, isDelete = false, refetch,}) {

  const navigate = useNavigate(); 

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ margin:5,backgroundColor:"#dbeafe",boxShadow:4}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
            <hr />
          </Typography>
           
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
                {data.maxAmoutPerDay}
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

          <div className="bg-blue-200">
            <div className="bg-blue-100">Travelers</div>
            <List>
              {data.travelers.map((t) => {
                return (
                  <ListItem key={t.travelerUserId}>
                    <TravelerCard
                      data={t}
                      isDelete={isDelete}
                      travelDetailsId={data.tarvelDetailId}
                      refetch={refetch}
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
              onClick={() => navigate("update/" + data.tarvelDetailId)}
            >
              See more
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
export default TravelDetailCard;
