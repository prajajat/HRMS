import {
  Button,
  FormLabel,
  MenuItem,
  Paper,
  Select,
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
import { useEffect, useMemo, useState } from "react";
import NewExpenseForm from "./NewExpenseForm";

function ExpenseContainer({ travelerId = 0, ownerType }) {
  const [search, setSearch] = useState("?");
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
  } = fun(travelerId, search);

  useEffect(() => {
    refetchEp();
  }, [search]);

  var totalClaimed = 0;
  if (ownerType != "HR" && !isLoadingEp) {
    totalClaimed = dataEp?.data.reduce((acc, curr) => {
      if (curr.status == "APPROVED") return acc + curr.amount;
      else return acc;
    }, 0);
    console.log(totalClaimed);
    console.log(dataEp);
  }
  const list = dataEp?.data || [];
  var uniqueTravel = useMemo(() => {
    if (dataEp?.data.length == 0) return [];
    return [
      ...new Set(
        list.map(
          (item) =>
            item.travelerTravelDetailId + "-" + item.travelerTravelDetailTitle,
        ),
      ),
    ];
  }, [dataEp]);
  var uniqueEmp = useMemo(() => {
    if (dataEp?.data.length == 0) return [];
    return [
      ...new Set(
        list.map((item) => item.travelerUserId + "-" + item.travelerUserName),
      ),
    ];
  }, [dataEp]);
  var uniqueDate = useMemo(() => {
    if (dataEp?.data.length == 0) return [];
    return [...new Set(list.map((item) => item.expenseDate))];
  }, [dataEp]);
  var uniqueStatus = useMemo(() => {
    if (dataEp?.data.length == 0) return [];
    return [...new Set(list.map((item) => item.status))];
  }, [dataEp]);
  const [filterEmp, setFilterEmp] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTravel, setFilterTravel] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const handleApplyFilter = () => {
    var searchVal = "?";
    if (filterEmp != "") searchVal += "userId=" + filterEmp + "&";
    if (filterStatus != "") searchVal += "status=" + filterStatus + "&";
    if (filterTravel != "") searchVal += "travel=" + filterTravel + "&";
    if (filterStartDate != "")
      searchVal += "expenseStartDate=" + filterStartDate + "&";
    if (filterEndDate != "")
      searchVal += "expenseEndDate=" + filterEndDate + "&";
    setSearch(searchVal);
    console.log(searchVal);
  };
  console.log(uniqueTravel);
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

      {ownerType == "HR" && (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-start border  border-blue-100">
            <FormLabel>Select employee</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10"
              onChange={(e) => {
                setFilterEmp(
                  e.target.value.substring(0, e.target.value.indexOf("-")),
                );
                console.log(
                  e.target.value.substring(0, e.target.value.indexOf("-")),
                );
              }}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueEmp.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>

          <div className="flex flex-col justify-start">
            <FormLabel>Select Travel</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10"
              onChange={(e) => {
                setFilterTravel(
                  e.target.value.substring(0, e.target.value.indexOf("-")),
                );
                console.log(
                  e.target.value.substring(0, e.target.value.indexOf("-")),
                );
              }}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueTravel.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>

          <div className="flex flex-col justify-start">
            <FormLabel>Select status</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10"
              onChange={(e) => {
                setFilterStatus(e.target.value);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueStatus.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>

          <div className="flex flex-col justify-start">
            <FormLabel>Select Start Date</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10"
              onChange={(e) => {
                setFilterStartDate(e.target.value);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueDate.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>

          <div className="flex flex-col justify-start">
            <FormLabel>Select End Date</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-10 mb-10"
              onChange={(e) => {
                setFilterEndDate(e.target.value);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueDate.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>
          <div className="w-20 h-10">
            <Button variant="contained" size="sm" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </div>
        </div>
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
