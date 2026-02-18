import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TravelerCard from "./TravelerCard";
import { useState } from "react";
import { usePatchExpense } from "../Query/useQueries";
import { useSelector } from "react-redux";

function ExpenseCard({ data, ownerType, refetch }) {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [remark, setRemark] = useState(data.remark);
  const userId=useSelector(state=>state.user.userId);
  const { mutate, isPending, isError, error } = usePatchExpense();
  const handleSave = () => {
    const dto = {
      status: status,
      remark: remark,
    };
    mutate({ 
       eId:data.travelExpensesId,
       userId:userId,
      dto:dto
    },
       {
      onSuccess: (response) => {
        console.log("success");
        alert("expense updated");
        refetch();
      },
    });
  };
 
  return (
    <TableRow
      key={data.travelExpensesId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      { ownerType=="HR"&&
      <TableCell>
        <Button
          onClick={() => {
            if (edit) {
              handleSave();
              console.log(ownerType);
            }
            setEdit(!edit);
          }}
        >
          {edit ? "Save" : "Edit"}
        </Button>
      </TableCell>
}
      <TableCell component="th" scope="row">
        {data.amount}
      </TableCell>
      <TableCell align="right">{data.expenseDate}</TableCell>
     
      <TableCell align="right">
        {edit ? (
          <Select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            <MenuItem value={"APPROVED"}>Approved</MenuItem>
            <MenuItem value={"REJECTED"}>Rejected</MenuItem>
          </Select>
        ) : (
          data.status
        )}
      </TableCell>
      <TableCell align="right">
        {edit ? (
          <TextField
            className="w-30"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          ></TextField>
        ) : (
          data.remark
        )}
      </TableCell>
     
      {ownerType == "HR" && 
        <>
          <TableCell align="right">{data.travelerUserName}</TableCell>
          <TableCell align="right">{data.travelerTravelDetailTitle}</TableCell>
        </>
      }
      <TableCell align="right">
        {data.documents.map((d) => {
          return (
            <Button onClick={() => window.open(d.url)}>{d.fileName} </Button>
          );
        })}
      </TableCell>
    </TableRow>
  );
}
export default ExpenseCard;
