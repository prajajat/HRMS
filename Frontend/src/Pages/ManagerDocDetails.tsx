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
import { useSelector } from "react-redux";
import DocumentCard from "../Components/DocumentCard";
import { useGetDocumentByManager } from "../Query/useQueries";

function ManagerDocDetails() {
  const userId = useSelector((state) => state.user.userId);
  const { isLoading, data, isError, refetch } = useGetDocumentByManager(userId);
  console.log(data);
  return (
    <>
      <Typography variant="h3"> Travel Documents</Typography>

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
            {!isLoading &&
              data?.data.length > 0 &&
              data?.data.map((d) => {
                return <DocumentCard data={d} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ManagerDocDetails;
