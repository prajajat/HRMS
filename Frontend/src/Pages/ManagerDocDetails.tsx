import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import DocumentCard from "../Components/DocumentCard";
import { useGetDocumentByManager } from "../Query/useQueries";

function ManagerDocDetails() {
  const userId = useSelector((state) => state.user.userId);
  const { isLoading, data, isError, refetch } = useGetDocumentByManager(userId);

  return (
    <div className="p-4">
      <h2 className="mb-4">Travel Documents</h2>

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 rounded">
          <p className="text-red-600">Failed to load documents</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 ">
          <p>No documents found</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Uploaded by</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Visibility</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Document</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Traveler</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Travel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((d) => (
                <DocumentCard key={d.documentId} data={d} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
export default ManagerDocDetails;