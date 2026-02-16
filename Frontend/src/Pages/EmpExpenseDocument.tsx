import { useParams, useSearchParams } from "react-router-dom";
import {
 
  useGetExpenceBytraveler,
  useGetTravelById,
} from "../Query/useQueries";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmpTravelDetailCard from "../Components/EmpTravelDetailCard";
 
 
import ExpenseContainer from "../Components/ExpenseContainer";
import DocumentContainer from "../Components/DocumentContainer";
import { useState } from "react";

function EmpExpenseDocument() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tid = searchParams.get("tid");
  console.log(tid);
  const [view, SetView] = useState("");
  
  const {
    isLoading: isLoadingTD,
    data: dataTD,
    isError: isErrorTD,
    refetch: refetchTD,
  } = useGetTravelById(tid);
 

  return (
<>
        <Typography variant="h3">Travel details </Typography>
        {!isLoadingTD && (
          <EmpTravelDetailCard data={dataTD.data} isSeeMore={false} />
        )}

        {
          <>
            
              <ExpenseContainer travelerId={id} ownerType={"employee"}/>
          </>
        }
        {
          <> <DocumentContainer travelDetailId={tid} travelerId={id} ownerType={"employee"} />
          </>
        }
    </>
  );
}
export default EmpExpenseDocument;
