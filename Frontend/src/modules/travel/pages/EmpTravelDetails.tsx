import { CircularProgress, Grid, List, ListItem, Typography } from "@mui/material";
import { useGetTravelByUser } from "../../../Query/useQueries";
import EmpTravelDetailCard from "../components/EmpTravelDetailCard";
 

function EmpTravelDetails() {
  
  const { isLoading, data, isError } = useGetTravelByUser();
 
  return (
    <>
       <Typography fontSize={36}>Travel Details for you</Typography>
      <hr />
      <br />

       {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load</p>
        </div>
      )}

     
      {!isLoading && data?.data && (
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
