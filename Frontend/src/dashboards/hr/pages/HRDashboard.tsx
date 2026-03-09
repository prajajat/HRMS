import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useGetHrDashboardInfo } from "../queries/HRDashboardQueries"
 

function HRDashboard() {
  const { data, isLoading,isError } = useGetHrDashboardInfo();
  return (
     <div className="p-4  bg-gray-100"> 
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          HR Management Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage travel approvals, expenses, documents, and game bookings,
          manage job and System configurations.
        </Typography>
      </Box> 

       {isLoading&& (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load </p>
        </div>
      )}


      {!isLoading && data?.data != null && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 ">
                  Total Job Created
                </h3>
              </div>
              <p
                id="active-agents"
                className="text-3xl font-bold text-slate-800 mt-2"
              >
                {data?.data.totalJobCreated}
              </p>
            </div>
          </div>
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 ">
                  Total Expense Reviewed
                </h3>
              </div>
              <p
                id="processes-running"
                className="text-3xl font-bold text-slate-800 mt-2"
              >
                {data?.data.totalExpenseReviewed}
              </p>
            </div>
          </div>
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 ">
                  Total Travel Created
                </h3>
              </div>
              <p
                id="processes-running"
                className="text-3xl font-bold text-slate-800 mt-2"
              >
                {data?.data.totalTravelCreated}
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
    </div>
  );
}
export default HRDashboard;
