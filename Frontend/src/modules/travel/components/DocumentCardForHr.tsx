import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import TravelerCard from "./TravelerCard";
import { useSelector } from "react-redux";

function DocumentCardForHr({ data }) {
  const userId = useSelector((state) => state.user.userId);
  return (
    <TableRow
      key={data.documentId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data.uploadedBy.userId == userId ? "You" : data.uploadedBy.userName}
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => window.open(data.url)}>{data.fileName} </Button>
      </TableCell>
      <TableCell align="right">{data.ownerType}</TableCell>
      <TableCell align="right">{data.documentType}</TableCell>
      <TableCell align="right">{data.createdAt}</TableCell>
      <TableCell align="right">{data.updatedAt}</TableCell>
      <TableCell align="right" className="flex flex-row">
        {data.travelerDocuments.map((e) => {
          return (
            <div className="m-5 bg-blue-300">
              {"Used in travel "}
              {e.travelerTravelDetailTitle} {". and asign to "}
              {e.traveler.userName}
              {" with visibility of  "}
              {e.visibility}
            </div>
          );
        })}
      </TableCell>
    </TableRow>
  );
}
export default DocumentCardForHr;
