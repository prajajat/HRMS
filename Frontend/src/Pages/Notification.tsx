import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetAllNotification } from "../Query/useQueries";

function Notification(){
      const {
        isLoading,
        data,
        isError,
      } = useGetAllNotification();

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" color="Green">
            <TableHead>
              <TableRow>
               
                <TableCell> Title</TableCell>
                <TableCell  >Description</TableCell>
                <TableCell >Status</TableCell>
                 
              </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading&&data.data.length>0&&
                data.data.map((n) => {
                  return (
                    <TableRow>
                         <TableCell>{n.title}</TableCell>
                          <TableCell>{n.description}</TableCell>
                          <TableCell>{!n.isRead?"new":"old"}</TableCell>
                         </TableRow>
                  );
                })
            }
            </TableBody>
          </Table>
        </TableContainer>
      
    );
}
 
export default Notification;