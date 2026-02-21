import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { useGetAllNotification } from "../Query/useQueries";

function Notification() {
  const { isLoading, data, isError } = useGetAllNotification();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Notifications
      </Typography>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Box sx={{ p: 2, bgcolor: "#ffebee", borderRadius: 1 }}>
          <Typography color="error">Failed to load notifications</Typography>
        </Box>
      )}

      {!isLoading && data?.data && data.data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((n) => (
                <TableRow key={n.notificationId}>
                  <TableCell>{n.title}</TableCell>
                  <TableCell>{n.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={n.isRead ? "Seen" : "New"}
                      color={n.isRead ? "default" : "primary"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !isLoading && !isError && (
          <Box sx={{ p: 2, textAlign: "center", color: "textSecondary" }}>
            <Typography variant="body2">No notifications</Typography>
          </Box>
        )
      )}
    </Box>
  );
}
export default Notification;