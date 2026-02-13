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

function EmpTravelDetailCard({ data }) {
  const navigator = useNavigate();
  return (
  <Grid item xs={12} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>

          {data.description}

          <div className="bg- m-3 rounded-sm">

            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> startDate </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {" "}
                {data.startDate}
              </div>
            </div>

             <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> endDate </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {" "}
               {data.endDate}
              </div>
            </div>

            
             <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> createdAt </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                
              {data.createdAt}
              </div>
            </div>
            
             <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> updateAt </div>
              <div className="bg-gray-100 m-3 rounded-sm">
               
            {data.updateAt}
              </div>
            </div>


              <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> createdName </div>
              <div className="bg-gray-100 m-3 rounded-sm">
               
            {data.createdName}
              </div>
            </div>

            
              <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> maxAmoutPerDay </div>
              <div className="bg-gray-100 m-3 rounded-sm">
               
           {data.maxAmoutPerDay}
              </div>
            </div>
 
            
          </div>
            <div className="bg-blue-100">
              <div className="bg-gray-300" >
              travelers 
              </div>
          <List>
            {data.travelers.map((t) => {
              return (
                <ListItem key={t.travelerUserId}>
                  <TravelerCard
                    data={t} travelDetailsId={undefined} refetch={undefined}      
                  />
                </ListItem>
              );
            })}
          </List>
           </div>
        </CardContent>
        <CardActions>
          
             <Button
            size="small"
            onClick={() =>
              navigator("/employee/travel/details/" + data.travelerId)
            }
          >
            see more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default EmpTravelDetailCard;
