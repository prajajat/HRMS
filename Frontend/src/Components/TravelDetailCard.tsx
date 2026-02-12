import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";
import TravelerCard from "./TravelerCard";
import { Navigate, useNavigate } from "react-router-dom";

 

function TravelDetailCard({data}){
    const navigate=useNavigate();
    return (
        <div className="grid grid-cols-3 gap-4 p-5">
    <Card sx={{ maxWidth: 345 }}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}<br/>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
           startDate - {data.startDate} <br/>
           endDate - {data.endDate}<br/>
           createdAt -{data.createdAt}<br/>
           updateAt -{data.updateAt}<br/>
          createdName-{data.createdName}<br/>
          maxAmoutPerDay-{data.maxAmoutPerDay}<br/>
          travelers :
          <List>
            {
                data.travelers.map(
                    (t)=>{
                        return <ListItem><TravelerCard data={t}/></ListItem>
                    }
                )
            }
          </List>
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>navigate("update/"+data.tarvelDetailId )} >see more</Button>
        
      </CardActions>
    </Card></div>
);

}
export default TravelDetailCard;


 