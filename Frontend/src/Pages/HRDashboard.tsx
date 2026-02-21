import { Box, Container, Grid, Paper, Typography } from "@mui/material";

function HRDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          HR Management Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage travel approvals, expenses, documents, and game bookings.
        </Typography>
      </Box>
    </Container>
  );
}
export default HRDashboard;