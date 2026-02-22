import { Box, Container, Grid, Paper, Typography } from "@mui/material";

function EmployeeDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your travel details, expenses, and documents in one place.
        </Typography>
      </Box>

    </Container>
  );
}
export default EmployeeDashboard;