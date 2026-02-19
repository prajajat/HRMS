import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

 
import { Navigate, useNavigate } from "react-router-dom";
import TravelerCard from "./TravelerCard";
import { useState } from "react";
import SlotCard from "./SlotCard";
import { useCancelBooking } from "../Query/useQueries";

function GameBookingCard({
  data,refetch
}) {
  const userId=useSelector((state)=>state.user.userId);
    var color="green";
  switch(data.status)
  {
    case "BOOKED" :color="green";break;
    case "PENDING":color="yellow";break;
    case "QUEUED" :color="blue";break;
    case "REJECTED" : color="red";break;
    case "CANCELLED" : color="red";break;
    default :color="red";
  } 
   const {
        mutate,
        
        isPending,
        isError ,
        error,
      } =   useCancelBooking();
const handleCancel=(id)=>
{
   mutate({id:id}, {
      onSuccess: (response: any) => {
        alert(response.data.message);
        
        refetch();
      },
    }

   )
}

  const[view,setView]=useState("");
 console.log(color);
  console.log(data);
  return (
    <div>
      <Card sx={{ maxWidth: 300, margin:5 }} >
    <div className="flex flex-col aline-item-center justify-center h-full " >
         <div className="flex flex-row aline-item-center justify-between w-full" >
          <div>{data.gameBookingId}</div>
          <div className={"bg-"+color+"-200"}>{data.status}</div>
          </div>
         
              <hr/>
              {data.createdBy!=null&&
              <div className="flex flex-row justify-items-stretch">
              <div className="bg-gray-100 m-3 rounded-sm">  Created By  </div>
              <div className="bg-gray-100 m-3 rounded-sm">
                 
                  {userId==data.createdBy.userId?
                <div>you
               
               </div> 
               :
                data.createdBy.name+" - "+data.createdBy.companyEmail
               } 
              </div>
            </div> 
             }
             <div className="flex flex-row aline-item-center justify-center  w-full">
                   {
                     view==""&& <><Button color="secondary"onClick={()=>setView("showParticipants")} className="bg-blue-100" >Show participants</Button>
                                    <Button color="secondary" onClick={()=>setView("showSlots")}>Show Slots of booking </Button></>
                   }
                   {
                    view!=""&& <><Button color="secondary" onClick={()=>setView("")}>close</Button></>
                   }
                </div>
                 <div className="bg-blue-300">
            { view=="showParticipants"&&
              data.participants.map((p)=>{
                return <div className="border-b-2 bg-blue-200 rounded-lg border-indigo-500 flex flex-row justify-items-center w-full m-5">
                        
                           <div>{p.name+" - "+p.companyEmail}</div>
                           </div>;
            })
            }
            </div>
               <div className="bg-blue-300">
              { view=="showSlots"&& 
             
              data.gameSlots.map((s)=>{
                return <SlotCard data={s}/>;
               
            })
             
            }
            </div>
        { data.createdBy!=null&&userId==data.createdBy.userId&&<Button  color="error" onClick={()=>handleCancel(data.gameBookingId)}>Cancel booking</Button>}

    </div>
      </Card>
       </div>
 
  );
}
export default GameBookingCard;
 

//   
//             "participants": [
//                 {
//                     "userId": 1,
//                     "companyEmail": "some@gmail.com",
//                     "name": "s"
//                 },
//                  "gameSlots": [
//                 {
//                     "gameSlotId": 1,
//                     "slotStartTime": "23:59:00",
//                     "slotEndTime": "23:30:00",
//                     "date": "2026-02-18",
//                     "slotStatus": "BOOKED"
//                 },
//                 {
//                     "gameSlotId": 2,
//                     "slotStartTime": "23:59:00",
//                     "slotEndTime": "23:30:00",
//                     "date": "2026-02-18",
//                     "slotStatus": "BOOKED"
//                 }