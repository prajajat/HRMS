import { useState } from "react";
import { useCreateBooking, useGetALLUser } from "../Query/useQueries";
import SlotCard from "./SlotCard";
import { Button, List, ListItem, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

function SlotContainer({ data, gameId, refetch }) {
  console.log(data);
  const {
    isLoading: isEmpLoading,
    data: Empdata,
    isError: isEmpError,
  } = useGetALLUser();
  const userId = useSelector((state) => state.user.userId);
  const {
    mutate,

    isPending,
    isError,
    error,
  } = useCreateBooking();
  const [emp, setEmp] = useState([]);
  const [slot, setSlot] = useState([]);

  const handleAddEmp = (newEmp) => {
    if (emp.length > 0 && emp.find((e) => e.userId == newEmp.userId)) {
      return;
    }
    setEmp((emp) => [...emp, newEmp]);
  };

  const groupByDate = data.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});
  const sortDate = Object.keys(groupByDate).sort();

  const handleSlotAdd = (newSlot) => {
    console.log(newSlot);
    if (
      slot.length > 0 &&
      slot.find((e) => e.gameSlotId == newSlot.gameSlotId)
    ) {
      return;
    }

    setSlot((slot) => [...slot, newSlot]);
  };

  const handleBooking = () => {
    var dto = {
      gameSlots: [],
      allPlayers: [],
      createdBy: userId,
      gameId: gameId,
    };
    console.log(dto);
    dto.allPlayers = emp.map((e) => {
      return e.userId;
    });
    dto.allPlayers.push(userId);
    dto.gameSlots = slot.map((e) => {
      return e.gameSlotId;
    });

    console.log(dto);
    mutate(dto, {
      onSuccess: (response: any) => {
        // alert(response);
        console.log(response);
        refetch();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-auto ">
      {!isEmpLoading && (
        <div className="flex flex-col h-full mt-3">
          Add Players
          <Select
            type="text"
            defaultValue=""
            className="mt-10 mb-10"
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
       
        
          {      
          emp.length > 0 && (
            <div>
             <p>Player Added: </p>
         <div className="bg-slate-400">
            <List >
              {emp.map((e) => {
                return (
                  <ListItem key={e.userId}>
                    {e.name}-{e.companyEmail}
                  </ListItem>
                );
              })}
            </List>
            </div>
            </div>
          )
         
          }
            
        
           <div className="bg-slate-300">
          {slot.length > 0 && (
              <div>
             <p>  Added :Slots </p>
         <div className="bg-slate-400">
            <List>
              {slot.map((e) => {
                return <SlotCard data={e} key={e.gameSlotId} />;
              })}
            </List>
            </div>
            </div>
          )}
          </div>
          <Button onClick={handleBooking}>Make booking</Button>
        </div>
      )}
      <div className="flex flex-row aline-item-center justify-center  w-full ">
          
      {sortDate.map((date,indexOfDate) => (
        <div
          key={date}
          className="min-w-[200px]  m-3 p-3"
        >
          <div>{new Date(date).toDateString()}</div>
          <hr />

          {groupByDate[date].map((slot,indexOfSlot) => (
            <div
              key={slot.gameSlotId}
              onClick={() => handleSlotAdd(slot)}
              className={`rounded-lg p-3 mb-3 ${(indexOfDate%2==0&&indexOfSlot%2==1)||(indexOfDate%2==1&&indexOfSlot%2==0)? "bg-blue-300" : "bg-green-100"}`}
            >
              <SlotCard data={slot} />
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
}
export default SlotContainer;
