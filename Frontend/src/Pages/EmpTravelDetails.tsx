import { Grid, List, ListItem, Typography } from "@mui/material";
import { useGetAllTravel, useGetTravelByUser } from "../Query/useQueries";

import EmpTravelDetailCard from "../Components/EmpTravelDetailCard";

function EmpTravelDetails() {
  const { isLoading, data, isError } = useGetTravelByUser();
  console.log(data);
  console.log(isError);

  return (
    <div >
      <Typography variant='h3'>Travels for you</Typography>
      {!isLoading && (
           <Grid container spacing={2}>
          {data.data.map((td) => {
            return (
              <Grid item xs={12} md={4} key={td.travelDetailsId}>
                <EmpTravelDetailCard data={td} />{" "}
             </Grid>
            );
          })}
          </Grid>
        
      )}
    </div>
  );
}
export default EmpTravelDetails;
