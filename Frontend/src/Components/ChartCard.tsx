import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChartCard({ data, id, team = false }) {
  const userId = useSelector((state) => state.user.userId);
  const navigator = useNavigate();
  var color = "#94b5ee";

  if (id == data.userId) {
    color = "#097bf4";
  }

  return (
    <div
      className="flex flex-row aline-item-center"
      onClick={(e) => {
        console.log(data.userId);
        e.stopPropagation();
        navigator("/org-chart/" + data.userId);
      }}
    >
      {data.manager != null && <ChartCard data={data.manager} id={id} />}

      <Card sx={{ maxWidth: 200 , maxHeight:250,backgroundColor: color, margin: 5 }}>
        <div className="flex flex-row justify-center w-full">
        <img src={data.imageUrl} className="h-10 w-10 m-2"></img>
        </div>

        <CardContent>
           <div className="flex flex-row justify-center w-full">
          <Typography gutterBottom variant="h5" component="div">
            {data.name.toUpperCase()}
            
          </Typography>
          </div>
          <hr />
          <Typography
            sx={{ fontSize: 18, mb: 1.5 ,mt:1}}
            variant="h5"
            color="text.secondary"
          >
            {data.companyEmail}
          </Typography>
          <Typography
            sx={{ fontSize: 18, mb: 1.5 }}
            variant="h5"
            color="text.secondary"
          >
            {" "}
            Designation :{data.designation}
          </Typography>

          <Typography
            sx={{ fontSize: 18, mb: 1.5 }}
            variant="h5"
            color="text.secondary"
          >
            Dept :{data.departmentName?data.departmentName:'N/A'}
          </Typography>
        </CardContent>
      </Card>

      {!team && <img src="/back.png" className="h-10 w-10 mt-10"></img>}
    </div>
  );
}
export default ChartCard;
