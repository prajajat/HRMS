import { List, ListItem } from "@mui/material";
import { useGetAllTravel } from "../Query/useQueries";
import TravelDetailCard from "../Components/TravelDetailCard";

function TravelDetails(){
    const {isLoading,data,isError } =useGetAllTravel();
   console.log(data);
   console.log(isError);

    return (<>Dashboard
    { !isLoading&&
       <List>
        {
        data.data.map((td)=>{
                       return <ListItem><TravelDetailCard data={td} /> </ListItem>;
                            }
                     )
       }
       </List>
}
          
    </>);
}  
export default TravelDetails;