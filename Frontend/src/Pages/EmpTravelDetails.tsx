import { Grid, List, ListItem, Typography } from "@mui/material";
import { useGetAllTravel, useGetTravelByUser } from "../Query/useQueries";

import EmpTravelDetailCard from "../Components/EmpTravelDetailCard";

function EmpTravelDetails() {
  const { isLoading, data, isError } = useGetTravelByUser();
  console.log(data);
  console.log(isError);

  return (
    <>
      <Typography variant='h3'>Travels for you</Typography>
      {!isLoading && (
           <Grid container spacing={2}>
          {data.data.map((td) => {
            return (
              
                <EmpTravelDetailCard data={td} />
           
            );
          })}
          </Grid>
        
      )}
    </>
  );
}
export default EmpTravelDetails;
