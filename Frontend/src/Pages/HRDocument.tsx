import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useGetDocuments } from "../Query/useQueries";
import { useState } from "react";
import DocumentCardForHr from "../Components/DocumentCardForHr";
import NewDocumentForm from "../Components/NewDocumentForm";

function HRDocument() {
  const { isLoading, data, isError, refetch } = useGetDocuments();
  const [view, setView] = useState();

  return (
    <div className="p-4">
      <h2 className="mb-4">Travel Documents</h2>

      <button
        onClick={() => setView(view !== "doc" ? "doc" : "")}
        className="mb-4 px-4 py-2 bg-blue-300  rounded hover:bg-blue-300"
      >
        {view !== "doc" ? "Add new doc" : "Cancel"}
      </button>

      {view === "doc" && <NewDocumentForm ownerType={"HR"} />}

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 rounded">
          <p>Failed to load documents</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8">
          <p>No documents found</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Uploaded by</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">File Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Owner</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Created</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Updated</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((d) => (
                <DocumentCardForHr key={d.documentId} data={d} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
export default HRDocument;