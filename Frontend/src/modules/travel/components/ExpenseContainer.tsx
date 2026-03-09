import {
  Button,
  FormLabel,
  InputLabel,
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
import {
  useGetAllCurrencies,
  useGetAllExpence,
  useGetCurrencyInINR,
  useGetExpenceBytraveler,
} from "../queries/TravelQueries";
import { useEffect, useMemo, useState } from "react";
import NewExpenseForm from "./NewExpenseForm";
import ExpenseChart from "./ExpenseChart";
 

function ExpenseContainer({ travelerId = 0, ownerType }) {
 
  var fun = useGetExpenceBytraveler;
  if (ownerType == "HR") {
    fun = useGetAllExpence;
  }
    const [search, setSearch] = useState("?");
  const { isLoading: isLoadingEp, data: dataEp, isError: isErrorEp, refetch: refetchEp,} = fun(travelerId, search);
  const { isLoading: isLoadingAllCurrencies,data: dataAllCurrencies,isError: isErrorAllCurrencies, refetch: refetchCurrencies,} = useGetAllCurrencies();



  const [view, setView] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [filterEmp, setFilterEmp] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTravel, setFilterTravel] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [showChart,setShowChart]=useState(false);

  
  //functions
  useEffect(() => {
    refetchEp();
  }, [search]);

  const list = dataEp?.data || [];
  var totalClaimed = 0;
  if (ownerType != "HR" && !isLoadingEp) {
    totalClaimed = dataEp?.data.reduce((acc, curr) => {
      if (curr.status == "APPROVED") return acc + curr.amount;
      else return acc;
    }, 0);
  }
  

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

 


  const handleApplyFilter = () => {
    var searchVal = "?";
    if (filterEmp != "") searchVal += "userId=" + filterEmp + "&";
    if (filterStatus != "") searchVal += "status=" + filterStatus + "&";
    if (filterTravel != "") searchVal += "travelId=" + filterTravel + "&";
    if (filterStartDate != "")
      searchVal += "expenseStartDate=" + filterStartDate + "&";
    if (filterEndDate != "")
      searchVal += "expenseEndDate=" + filterEndDate + "&";
    setSearch(searchVal);
    
  };
 
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex flex-row justify-between mx-10">
        {!isLoadingEp && (
          <Typography variant="h6" color="Green">
            {" "}
            {ownerType != "HR" && "Total claimed " + totalClaimed}
          </Typography>
        )}
        {ownerType != "HR" && (
          <Button
            onClick={() => {
              if (view != "expense") setView("expense");
              else setView("");
            }}
          >
            {view != "expense" ? "Add new expense" : "cancel"}
          </Button>
        )}
      </div>
      <div className="flex flex-row justify-between my-4 w-full justify-center">
        {view == "expense" && (
          <NewExpenseForm travelerId={travelerId} ownerType={ownerType}  setview={setView}/>
        )}
      </div>

      {ownerType == "HR" && (
        <div className="flex flex-row justify-between mb-5 m-10 w-9/10">
          <div className="flex flex-col justify-start border-b  border-cyan-700">
            <FormLabel>Select employee</FormLabel>
            <Select
              type="text"
              // defaultValue=""
              className="mt-2 mb-2"
              onChange={(e) => {
                setFilterEmp(
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

          <div className="flex flex-col justify-start border-b  border-cyan-700">
            <FormLabel>Select Travel</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-2 mb-2 size-sm"
              
              onChange={(e) => {
                setFilterTravel(
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

          <div className="flex flex-col justify-start border-b  border-cyan-700">
            <FormLabel>Select status</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-2 mb-2"
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

          <div className="flex flex-col justify-start border-b  border-cyan-700">
            <FormLabel>Select Start Date</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-2 mb-2"
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

          <div className="flex flex-col justify-start border-b  border-cyan-700">
            <FormLabel>Select End Date</FormLabel>
            <Select
              type="text"
              defaultValue=""
              className="mt-2 mb-2"
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
          <div className=" flex flex-col ">
            <Button
              variant="contained"
              size="sm"
              onClick={handleApplyFilter}
              sx={{ margin: 1, height: 40 }}
            >
              Apply Filter
            </Button>
            <Button
              variant="contained"
              size="sm"
              onClick={() => {
                setFilterEmp("");
                setFilterEndDate("");
                setFilterStartDate("");
                setFilterStatus("");
                setFilterTravel("");
                setSearch("?");
              }}
              sx={{ margin: 1, height: 40 }}
            >
              Clear filter
            </Button>
          </div>
        </div>
      )}
      
      {!isLoadingEp && (
        <div className="mx-1">
           {
            <Button onClick={()=>setShowChart(!showChart)}>{!showChart?"See Chart":"Close Chart"}</Button>
           }
          {dataEp?.data.length>0 && showChart&&<ExpenseChart apiData={dataEp?.data}/>}
          <TableContainer component={Paper}>
            <Table aria-label="simple table" color="Green">
              <TableHead>
                <TableRow>
                  {ownerType === "HR" && <TableCell>Action</TableCell>}
                  <TableCell>
                    {" "}
                    Amount
                    {!isLoadingAllCurrencies &&
                      dataAllCurrencies != undefined && (
                        <Select
                          type="text"
                          defaultValue=""
                          className="mt-10 mb-10"
                          onBlur={(e) => {
                            setCurrency(e.target.value);
                          }}
                        >
                          <MenuItem value={"inr"}>
                            {" "}
                            {dataAllCurrencies.data.inr}
                          </MenuItem>
                          <MenuItem value={"aud"}>
                            {" "}
                            {dataAllCurrencies.data.aud}
                          </MenuItem>
                          <MenuItem value={"eur"}>
                            {" "}
                            {dataAllCurrencies.data.eur}
                          </MenuItem>
                          <MenuItem value={"jpy"}>
                            {" "}
                            {dataAllCurrencies.data.jpy}
                          </MenuItem>
                          <MenuItem value={"mxn"}>
                            {" "}
                            {dataAllCurrencies.data.mxn}
                          </MenuItem>
                          <MenuItem value={"cad"}>
                            {" "}
                            {dataAllCurrencies.data.cad}
                          </MenuItem>
                        </Select>
                      )}
                  </TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Remark</TableCell>

                  {ownerType === "HR" && (
                    <>
                      <TableCell align="right">Employee</TableCell>
                      <TableCell align="right">Travel</TableCell>
                    </>
                  )}
                  <TableCell align="right">Updated By</TableCell>
                  <TableCell align="right">Documents</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoadingEp &&  dataEp.data.length>0&&
                  dataEp.data.map((expense) => {
                    return (
                      <ExpenseCard
                        data={expense}
                        ownerType={ownerType}
                        refetch={refetchEp}
                        key={dataEp.data.travelExpensesId}
                        currency={currency}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
export default ExpenseContainer;
