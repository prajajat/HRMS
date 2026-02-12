import { useParams } from "react-router-dom";
import { useGetTravelById } from "../Query/useQueries";

function HRUpdate(){
     const {id}=useParams();
    const {isLoading,data,isError } =useGetTravelById(id);
       console.log(data);
       console.log(isError);
    return (<>
    HRUpdate
    {
        !isLoading&&<p>{data.data.title}</p>
    }
    </>);

}
export default HRUpdate;