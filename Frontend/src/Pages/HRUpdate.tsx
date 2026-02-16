import { useParams, useSearchParams } from "react-router-dom";
import {
  useAssignTravelEmp,
  useGetAllEmp,
  useGetALLUser,
  useGetTravelById,
} from "../Query/useQueries";
import TravelDetailCard from "../Components/TravelDetailCard";
import { Button, List, ListItem, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

function HRUpdate() {
  const { id } = useParams();
  const { isLoading, data, isError, refetch } = useGetTravelById(id);
  const {
    isLoading: isEmpLoading,
    data: Empdata,
    isError: isEmpError,
  } = useGetALLUser();
  const { userId, roles } = useSelector((state) => state.user);
  const [emp, setEmp] = useState([]);
  const {
    mutate,
    isPending: assign,
    isError: isErrorAssign,
    error: errorAssign,
  } = useAssignTravelEmp();
  const handleAddEmp = (newEmp) => {
    if (emp.length > 0 && emp.find((e) => e.userId == newEmp.userId)) {
      return;
    }
    setEmp((emp) => [...emp, newEmp]);
  };

  const handelAssign = () => {
    var dto = { employees: [], travelDetailsId: data.data.tarvelDetailId };
    console.log(dto);
    dto.employees = emp.map((e) => {
      return e.userId;
    });

    console.log(dto);
    mutate(dto, {
      onSuccess: (response: any) => {
        console.log("save");
        refetch();
      },
    });
  };

  console.log(emp);

  return (
    <>
      HRUpdate
      {!isLoading && (
        <div>
          <TravelDetailCard
            data={data.data}
            isSeeMore={false}
            isDelete={true}
            refetch={refetch}
          />
          {data?.data.createdId == userId && (
            <div>
              <Button size="small" onClick={() => console.log("e")}>
                Edit
              </Button>
              <Button
                size="small"
                className="text-red"
                onClick={() => console.log("e")}
              >
                Delete
              </Button>
              <br />
              Add Employee to travel
              {!isEmpLoading && (
                 <div>
                  
       <Select
          type="text"
          defaultValue=""
          className="mt-10 mb-10"
          onChange={(e)=> handleAddEmp(e.target.value)}
           
        > 
        { 
         Empdata.data.map((e)=>{
          return  <MenuItem value={e}>{e.name}- {e.companyEmail}</MenuItem>
        })
        } 
          </Select>

                  added :
                  {emp.length > 0 && (
                    <List>
                      {emp.map((e) => {
                        return (
                          <ListItem key={e.userId}>
                            {e.name}-{e.companyEmail}
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                  <Button onClick={handelAssign}>Add Employes</Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default HRUpdate;
