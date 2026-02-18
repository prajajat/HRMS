import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpenseCard from "./ExpenseCard";
import { useGetAllExpence, useGetExpenceBytraveler } from "../Query/useQueries";
import { useState } from "react";
import NewExpenseForm from "./NewExpenseForm";

function ExpenseContainer({ travelerId = 0, ownerType }) {
  var fun = useGetExpenceBytraveler;
  if (ownerType == "HR") {
    fun = useGetAllExpence;
  }

  const [view, SetView] = useState("");
  const {
    isLoading: isLoadingEp,
    data: dataEp,
    isError: isErrorEp,
    refetch: refetchEp,
  } = fun(travelerId);

  var totalClaimed = 0;
  if (ownerType != "HR" && !isLoadingEp) {
    totalClaimed = dataEp?.data.reduce((acc, curr) => {
      if (curr.status == "APPROVED") return acc + curr.amount;
      else return acc;
    }, 0);
    console.log(totalClaimed);
    console.log(dataEp);
  }

  return (
    <>
      <Typography variant="h3"> Travel expenses </Typography>
      {!isLoadingEp && (
        <Typography variant="h5" color="Green">
          {" "}
          {ownerType != "HR" && "Total claimed " + totalClaimed}
        </Typography>
      )}
      {ownerType != "HR" && (
        <>
          <Button
            onClick={() => {
              if (view != "expense") SetView("expense");
              else SetView("");
            }}
          >
            {view != "expense" ? "Add new expense" : "cancel"}
          </Button>
          {view == "expense" && (
            <NewExpenseForm travelerId={travelerId} ownerType={ownerType} />
          )}
        </>
      )}

      {!isLoadingEp && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" color="Green">
            <TableHead>
              <TableRow>
                {ownerType === "HR" && <TableCell>Action</TableCell>}
                <TableCell> Amount</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Remark</TableCell>

                {ownerType === "HR" && (
                  <>
                    <TableCell align="right">Employee</TableCell>
                    <TableCell align="right">Travel</TableCell>
                  </>
                )}
                <TableCell align="right">Documents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoadingEp &&
                dataEp.data.map((expense) => {
                  return (
                    <ExpenseCard
                      data={expense}
                      ownerType={ownerType}
                      refetch={refetchEp}
                      key={dataEp.data.travelExpensesId}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
export default ExpenseContainer;
