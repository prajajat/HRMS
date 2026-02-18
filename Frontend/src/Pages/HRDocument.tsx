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
import { useGetDocuments } from "../Query/useQueries";
import { useState } from "react";
import DocumentCard from "../Components/DocumentCard";
import DocumentCardForHr from "../Components/DocumentCardForHr";
import NewDocumentForm from "../Components/NewDocumentForm";

function HRDocument() {
  const { isLoading, data, isError, refetch } = useGetDocuments();

  const [view, setView] = useState();
  console.log(view);
  return (
    <>
      <Typography variant="h3"> Travel Documents</Typography>

      <Button
        onClick={() => {
          if (view != "doc") setView("doc");
          else setView("");
        }}
      >
        {view != "doc" ? "Add new doc" : "cancel"}
      </Button>
      {view == "doc" && <NewDocumentForm ownerType={"HR"} />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Uploaded by</TableCell>
              <TableCell align="right">fileName</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">owner</TableCell>
              <TableCell align="right">created</TableCell>
              <TableCell align="right">updated</TableCell>
              <TableCell align="right">additional info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data.data.map((d) => {
                return <DocumentCardForHr data={d} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default HRDocument;
