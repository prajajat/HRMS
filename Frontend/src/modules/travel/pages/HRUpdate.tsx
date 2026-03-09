import { useParams, useSearchParams } from "react-router-dom";
import {
  useAssignTravelEmp, 
  useGetTravelById,
} from "../queries/TravelQueries";
import TravelDetailCard from "../Components/TravelDetailCard";
import { Button, CircularProgress, List, ListItem, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetALLUser } from "../../../shared/queries/CommonQueries";

function HRUpdate() {

  const { id } = useParams();

  const { isLoading, data, isError, refetch } = useGetTravelById(id);
  const { isLoading: isEmpLoading,data: Empdata,isError: isEmpError,} = useGetALLUser();
  const { mutate, isPending: assign, isError: isErrorAssign,error: errorAssign,} = useAssignTravelEmp();

  const { userId, roles } = useSelector((state) => state.user);
  const [emp, setEmp] = useState([]);
 
  //functions
  const handleAddEmp = (newEmp) => {
    if (emp.length > 0 && emp.find((e) => e.userId == newEmp.userId)) {
      return;
    }
    setEmp((emp) => [...emp, newEmp]);
  };

  const handelAssign = () => {
    var dto = { employees: [], travelDetailsId: data.data.tarvelDetailId };
   // console.log(dto);
    dto.employees = emp.map((e) => {
      return e.userId;
    });
    if(emp.length==0){
      alert("please select employee first");
      return;
    }
    //console.log(dto);
    mutate(dto, {
      onSuccess: (response: any) => {
        //console.log("save");
        alert("new Emp added to travel");
        refetch();
      },
    });
  };
 
  return (
    <div className="p-4  bg-gray-100">
      {isLoading && (
          <div className="flex justify-center py-8">
                    <CircularProgress />
          </div>
      )}

      {isError && (
           <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600"> 
                      Failed to load 
              </p>
           </div>
       )}
      {!isLoading && data?.data && (
        <div>  
           <h3 className="font-bold">Travel Config</h3>
          <TravelDetailCard
            data={data.data}
            isSeeMore={false}
            isDelete={true}
            refetch={refetch}
          />
          {data?.data.createdId == userId && (
          <div className="mt-10 w-max-2xl flex flex-row justify-center w-full">
              {!isEmpLoading && Empdata?.data && (
                <div className="mt-10 w-max-2xl flex flex-col bg-blue-200 rounded m-3 p-3">
                   <br />
                   Add Employee to travel
                  <Select
                    type="text"
                    defaultValue=""
                    className="mt-10 mb-10 w-100"
                    onChange={(e) => handleAddEmp(e.target.value)}
                  >
                    {Empdata.data.map((e) => {
                      return (
                        <MenuItem value={e}>
                          {e.name}- {e.companyEmail}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <br />
                  
                  {emp.length > 0 && (
                    <List>
                       added :
                      {emp.map((e) => {
                        return (
                          <ListItem key={e.userId}  sx={{backgroundColor:"#b9b9bf"}}>
                            {e.name}-{e.companyEmail}
                          </ListItem>
                        );
                      })}
                    </List>
                   
                  )}
                  <Button onClick={handelAssign}>{assign?"Adding":"Add Employes"}</Button>
                </div>
              )}
           
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default HRUpdate;
