import { useState } from "react";
import { useCreateBooking, useGetALLUser } from "../../../Query/useQueries";
import SlotCard from "./SlotCard";
import { Button, List, ListItem, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

function SlotContainer({ data, gameId, refetch, maxSlot, maxPlayer,setView }) {
 
  const {isLoading: isEmpLoading,data: Empdata,isError: isEmpError,} = useGetALLUser();
  const {mutate,isPending,isError,error,} = useCreateBooking();

  const userId = useSelector((state) => state.user.userId);
  const [emp, setEmp] = useState([]);
  const [slot, setSlot] = useState([]);

  const groupByDate = data.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});
  const sortDate = Object.keys(groupByDate).sort();
   
  //functions
  const handleAddEmp = (newEmp) => {
    if (emp.length > 0 && emp.find((e) => e.userId == newEmp.userId)) {
      return;
    }

    if (emp.length + 1 > maxPlayer - 1) {
      alert("max player allowed is only " + maxPlayer);
      return;
    }
    setEmp((emp) => [...emp, newEmp]);
  };

  const handleRemovePlayer = (id) => {
   var newEmp=emp.filter((e)=>e.userId!=id);
    setEmp(newEmp);
  }
   const handleRemoveSlot = (id) => {
   var newSlot=slot.filter((e)=>e.gameSlotId!=id);
    setSlot(newSlot);
  }
  
  const handleSlotAdd = (newSlot) => { 
    if (
      slot.length > 0 &&
      slot.find((e) => e.gameSlotId == newSlot.gameSlotId)
    ) {
      return;
    }
    if(newSlot.slotStatus=="EXPIRED"||newSlot.slotStatus=="COMPLETED")
    {
      alert("you selected slot is  either EXPIRED or COMPLETED ");
      return ;
    }

    if (slot.length + 1 > maxSlot) {
      alert("max slot allowed is only " + maxSlot);
      return;
    }
    setSlot((slot) => [...slot, newSlot]);
  };

  const handleBooking = () => {
    if (slot.length == 0 ||emp.length==0) {
      alert("select player and slot properly");
      return;
    }
    var dto = {gameSlots: [],allPlayers: [],createdBy: userId,gameId: gameId,}; 

    dto.allPlayers = emp.map((e) => {
      return e.userId;
    });
    
    dto.allPlayers.push(userId);
    dto.gameSlots = slot.map((e) => {
      return e.gameSlotId;
    }); 
    mutate(dto, {
      onSuccess: (response: any) => { 
        setEmp([]);
        setSlot([]);
        setView("");
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
        <div className="flex flex-col justify-center h-full mt-3 ">
          <div className="flex flex-row justify-center content-center w-full">
            Add Players
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10 w-sm"
              onChange={(e) => handleAddEmp(e.target.value)}
            >
              {Empdata?.data.map((e) => {
                if (userId == e.userId) return;
                return (
                  <MenuItem value={e}>
                    {e.name}- {e.companyEmail}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          {emp.length > 0 && (
          <div className="flex flex-row justify-center content-center w-full">
              <p>Player Added </p>
              <div className="bg-slate-400  w-sm"> 
                <List>
                  {emp.map((e) => {
                    return (
                      <ListItem key={e.userId} onClick={()=>handleRemovePlayer(e.userId)}>
                        {e.name}-{e.companyEmail}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          )}
          
            {slot.length > 0 && (
              <div className="flex flex-row justify-center content-center w-full mt-3">
            <p> Added Slots  </p>
                <div className="bg-slate-400  w-sm">
                  <List>
                    {slot.map((e) => {
                      return <div onClick={()=>handleRemoveSlot(e.gameSlotId)}><SlotCard data={e} key={e.gameSlotId}  /></div>;
                    })}
                  </List>
                </div>
              </div>
            )}
          
          <Button onClick={handleBooking} >Make booking</Button>
        </div>
      )}
      <div className="flex flex-row aline-item-center justify-center  w-full ">
        {sortDate.map((date, indexOfDate) => (
          <div key={date} className="   m-3 p-3">
            <div className="flex flex-row justify-center w-full bg-blue-600 my-4 text-white">
              {new Date(date).toDateString()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {groupByDate[date].map((s, indexOfSlot) => (
                <div>
                  <div
                    key={s.gameSlotId}
                    onClick={() => handleSlotAdd(s)}
                    className={`rounded-lg p-1 mb-3 
                      ${ slot.find((e) => e.gameSlotId == s.gameSlotId) ? "bg-green-900" :(indexOfDate % 2 == 0 && indexOfSlot % 2 == 1) || (indexOfDate % 2 == 1 && indexOfSlot % 2 == 0) ? "bg-gray-300" : "bg-violet-300" }
                    `}
                  >
                    <SlotCard data={s} />
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SlotContainer;
