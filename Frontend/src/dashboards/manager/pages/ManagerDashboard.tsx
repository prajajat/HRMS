import { Box, Container, Grid, Paper, Typography } from "@mui/material";

function ManagerDashboard() {
  return (
    <div className="p-4  bg-gray-100">
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Manager Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Oversee team documents and achievement.
        </Typography>
      </Box>
    </Container>
    </div>
  );
}
export default ManagerDashboard;