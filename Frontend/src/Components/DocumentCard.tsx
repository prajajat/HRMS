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

function DocumentCard({ data }) {
  const userId = useSelector((state) => state.user.userId);
  console.log(data);
  return (
    <TableRow
      key={data.travelExpensesId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data.document.uploadedByUserId == userId
          ? "You"
          : data.document.uploadedByUserName}
      </TableCell>
      <TableCell align="right">{data.visibility}</TableCell>
      <TableCell align="right">
        <Button onClick={() => window.open(data.document.url)}>
          {data.document.fileName}{" "}
        </Button>
      </TableCell>
      <TableCell align="right">{data.traveler.traveler.userName}</TableCell>
      <TableCell align="right">
        {data.traveler.travelerTravelDetailTitle}
      </TableCell>
    </TableRow>
  );
}
export default DocumentCard;
