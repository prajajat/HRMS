import { Grid, List, ListItem, Typography } from "@mui/material";
import { useGetAllTravel, useGetTravelByUser } from "../Query/useQueries";

import EmpTravelDetailCard from "../Components/EmpTravelDetailCard";

function EmpTravelDetails() {
  const { isLoading, data, isError } = useGetTravelByUser();
  if(!isLoading){
  console.log(data);
  console.log(isError);
  }

  return (
    <>
       <Typography fontSize={36}>Travel Details for you</Typography>
      <hr />
      <br />
     
      {!isLoading && (
         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {data.data.map((td,index) => {
            return <EmpTravelDetailCard data={td} key={index}/>;
          })}
          </div>
      )}
     
    </>
  );
}
export default EmpTravelDetails;
