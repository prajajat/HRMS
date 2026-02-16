import { Button, Card, CardActions, CardContent, Grid, List, ListItem, TableCell, TableRow, Typography } from "@mui/material";
import TravelerCard from "./TravelerCard";
import { useSelector } from "react-redux";


//  "documentId": 3,
//         "fileName": "my_problem",
//         "ownerType": "string",
//         "documentType": "string",
//         "createdAt": "2026-02-13T22:54:12.417186",
//         "updatedAt": "2026-02-13T22:54:12.417186",
//         "uploadedBy": {
//             "userName": "s",
//             "userId": "1"
//         },
//         "travelerDocuments": [
//             {
//                 "visibility": "All",
//                 "traveler": {
//                     "userName": "s",
//                     "userId": "1"
//                 },
//                 "travelerTravelDetailTarvelDetailId": "2",
//                 "travelerTravelDetailTitle": "string"

function DocumentCardForHr({data}){
    const userId =useSelector((state)=>state.user.userId);
    return (
               <TableRow
              key={ data.documentId }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.uploadedBy.userId==userId? "You" :
                data.uploadedBy.userName
                }
              </TableCell>
            <TableCell align="right"><Button onClick={()=>window.open(data.url)} >{data.fileName} </Button></TableCell>
              <TableCell align="right">{data.ownerType}</TableCell>
               <TableCell align="right">{data.documentType}</TableCell>
                <TableCell align="right">{data.createdAt}</TableCell>
                 <TableCell align="right">{data.updatedAt}</TableCell>
                  <TableCell align="right" className="flex flex-row">
                    {   
                        data.travelerDocuments.map((e)=>{
                            return <div className="m-5 bg-blue-300">{"Used in travel "}{e.travelerTravelDetailTitle} {". and asign to "}{e.traveler.userName}{" with visibility of  "}{e.visibility}</div>
                        })
                     }

                  </TableCell>

              
              
             
            </TableRow>
        
    );
}
export default DocumentCardForHr;