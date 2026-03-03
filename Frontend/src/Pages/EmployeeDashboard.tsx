import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useGetEmpDashboardInfo } from "../Query/useQueries";
function EmployeeDashboard() {
  const { data, isLoading } = useGetEmpDashboardInfo();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your travel details, expenses, documents, game booking in one
          place .
        </Typography>
      </Box>
      {!isLoading && data?.data != null && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 ">
                  Total Travel Assigned
                </h3>
              </div>
              <p
                id="active-agents"
                className="text-3xl font-bold text-slate-800 mt-2"
              >
                {data?.data.totalTravelAssign}
              </p>
            </div>
          </div>
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 ">
                  Total Post
                </h3>
              </div>
              <p
                id="processes-running"
                className="text-3xl font-bold text-slate-800 mt-2"
              >
                {data?.data.totalPost}
              </p>
            </div>
          </div>
          <div className="glass-ui glass-card rounded-xl p-5 bg-blue-100">
            <h3 className="text-lg font-semibold text-slate-800 ">Job</h3>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="text-xs text-slate-500  ">Share</p>
                <p
                  id="dashboard-uptime"
                  className="text-xl font-bold text-green-500  "
                >
                  {data?.data.totalJobShare}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 ">Referrals</p>
                <p
                  id="dashboard-incidents"
                  className="text-xl font-bold text-green-500  "
                >
                  {data?.data.totalJobReferrals}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 ">Referrals Reviewed</p>
                <p
                  id="dashboard-downtime"
                  className="text-xl font-bold  text-green-500 "
                >
                  {data?.data.totalJobReferralsReviewed}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-ui glass-card rounded-xl p-5 flex flex-col justify-between bg-blue-100">
            <div
              id="availability-chart-dashboard"
              className="grid grid-cols-24 gap-1 h-12 mb-4"
            >
              <h3 className="text-lg font-semibold text-slate-800  mb-4">
                Games
              </h3>
            </div>

            <div className="overflow-y-auto h-40 border border-white/10   rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="text-xs text-slate-500  uppercase bg-white/5 sticky top-0">
                  <tr>
                    <th className="px-2 py-1">Name </th>
                    <th className="px-2 py-1">Total Slot Played</th>
                  </tr>
                </thead>
                <tbody id="dashboard-incident-log">
                  {data?.data.games.map((game) => {
                    return (
                      <tr className="border-b border-white/10 ">
                        <td className="px-2 py-1">{game.gameName}</td>
                        <td className="px-2 py-1">{game.totalSlotPlayed}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
export default EmployeeDashboard;
