import { useParams } from "react-router-dom";
import { useGetExpenceBytraveler } from "../Query/useQueries";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
 
 

function EmpExpenseDocument() {
    const { id } = useParams();
    console.log(id);
  const { isLoading, data, isError, refetch } = useGetExpenceBytraveler(id);
   
  return <div  >
 <div>
      <Typography variant='h3'>Travel details </Typography>

       


       {
      <Grid container spacing={2}>
        
      </Grid>
      }
    </div>
    
 </div>
}
export default EmpExpenseDocument;


 