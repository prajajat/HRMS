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
import {
  useGetDocumentsBytraveler,
  useGetExpenceBytraveler,
} from "../Query/useQueries";
import { useState } from "react";
import NewDocumentForm from "./NewDocumentForm";
import DocumentCard from "./DocumentCard";

function DocumentContainer({ travelerId, travelDetailId, ownerType }) {
  const [view, SetView] = useState("");
  const {
    isLoading: isLoadingTDoc,
    data: dataTDoc,
    isError: isErrorTDoc,
    refetch: refetchTDoc,
  } = useGetDocumentsBytraveler(travelerId);
  console.log(dataTDoc);
  return (
    <div className="bg-gray-100">
      <div className="flex flex-row justify-end mx-10">
        <Button
          onClick={() => {
            if (view != "doc") SetView("doc");
            else SetView("");
          }}
        >
          {view != "doc" ? "Add new doc" : "cancel"}
        </Button>
      </div>
      <div className="flex flex-row my-4 w-full justify-center">
         
        {view == "doc" && (
          <NewDocumentForm
            travelerId={travelerId}
            travelDetailId={travelDetailId}
            ownerType={ownerType}
          />
        )}
         
      </div>
      <div className="mx-20">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Uploaded by</TableCell>
                <TableCell align="right">Visibility</TableCell>
                <TableCell align="right">Document</TableCell>
                <TableCell align="right">Traveler</TableCell>
                <TableCell align="right">Travel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoadingTDoc &&
                dataTDoc.data.map((d) => {
                  return <DocumentCard data={d} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default DocumentContainer;
