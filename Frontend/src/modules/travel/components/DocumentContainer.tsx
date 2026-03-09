import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
 
import {
  useGetDocumentsBytraveler, 
} from "../queries/TravelQueries"
import { useState } from "react";
 
import DocumentCard from "./DocumentCard";
import NewDocumentForm from "./NewDocumentForm";

function DocumentContainer({ travelerId, travelDetailId, ownerType }) {

   const {
    isLoading: isLoadingTDoc,
    data: dataTDoc,
    isError: isErrorTDoc,
    refetch: refetchTDoc,
  } = useGetDocumentsBytraveler(travelerId);

  const [view, SetView] = useState("");
 
  //console.log(dataTDoc);
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
      
  {isLoadingTDoc && (
                  <div className="flex justify-center py-8">
                    <CircularProgress />
                  </div>
    )}

  {isErrorTDoc && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-600">
                      Failed to load 
                    </p>
                  </div>
    )}
    { !isLoadingTDoc && dataTDoc?.data &&
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
          }
    </div>
  );
}
export default DocumentContainer;
