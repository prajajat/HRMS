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

import TravelerCard from "./TravelerCard";
import { Navigate, useNavigate } from "react-router-dom";

function TravelDetailCard({
  data,
  isSeeMore = true,
  isDelete = false,
  refetch,
}) {
  const navigate = useNavigate();

  console.log(data);
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>

          {data.description}

          <Typography className="bg- m-3 rounded-sm">
            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> startDate </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                {" "}
                {data.startDate}
              </div>
            </div>

            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> endDate </div>
              <div className="bg-gray-100 m-3 rounded-sm"> {data.endDate}</div>
            </div>

            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> createdAt </div>
              <div className="bg-gray-100 m-3 rounded-sm">{data.createdAt}</div>
            </div>

            <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm"> updateAt </div>
              <div className="bg-gray-100 m-3 rounded-sm">{data.updateAt}</div>
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
          </Typography>
          <div className="bg-blue-100">
            <div className="bg-gray-300">travelers</div>
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
              see more
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
export default TravelDetailCard;
