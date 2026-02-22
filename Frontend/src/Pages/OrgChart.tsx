import { useNavigate, useParams } from "react-router-dom";
import { useGetALLUser, useGetUserById } from "../Query/useQueries";
import ChartCard from "../Components/ChartCard";
import { CircularProgress } from "@mui/material";

function OrgChart() {
  const navigator = useNavigate();
  const { id } = useParams();
  const { isLoading: isLoadingAll, data: dataAll, isError: isErrorAll } =
    useGetALLUser();

  const { isLoading: isLoadingUser, data: dataUser, isError: isErrorUser } =
    useGetUserById(id);

  return (
    <div className="p-4">
      {isLoadingAll ? (
        <div className="flex justify-center py-3">
          <CircularProgress size="small" />
        </div>
      ) : (
        <div className="mb-4 max-w-xs">
          <label className="block text-sm font-medium mb-2">Select Employee</label>
          <select
            defaultValue=""
            onChange={(e) => navigator("/org-chart/" + e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose an employee --</option>
            {dataAll?.data?.map((e) => (
              <option key={e.userId} value={e.userId}>
                {e.name} - {e.companyEmail}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLoadingUser ? (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Manager Chain</h3>
            <div className="overflow-x-auto">
              {!isLoadingUser && dataUser?.data && (
                <ChartCard data={dataUser.data} id={id} />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Direct Reports</h3>
            {!isLoadingUser &&
            dataUser?.data?.teamMember &&
            dataUser.data.teamMember.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {dataUser.data.teamMember.map((e) => (
                  <div key={e.userId}>
                    <ChartCard data={e} id={id} team={true} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No direct reports</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default OrgChart;