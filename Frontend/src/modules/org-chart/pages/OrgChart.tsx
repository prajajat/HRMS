import { useNavigate, useParams } from "react-router-dom";
 
import { CircularProgress } from "@mui/material";
import {  useGetUserById } from "../queries/Org-ChartQueries";
import ChartCard from "../components/ChartCard";
import { useGetALLUser } from "../../../shared/queries/CommonQueries";

function OrgChart() {
  const { id } = useParams();

  const { isLoading: isLoadingAll, data: dataAll, isError: isErrorAll,} = useGetALLUser();
  const {isLoading: isLoadingUser,data: dataUser,isError: isErrorUser,} = useGetUserById(id);

  const navigator = useNavigate();

  return (
    <div className="p-4  bg-gray-100">
      {isLoadingAll ? (
        <div className="flex justify-center py-3">
          <CircularProgress size="small" />
        </div>
      ) : isErrorAll ? (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load</p>
        </div>
      ) : (
        <div className="mb-4 max-w-xs">
          <label className="block text-sm font-medium mb-2">
            Select Employee
          </label>
          <select
            defaultValue=""
            onChange={(e) => navigator("/employee/org-chart/" + e.target.value)}
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

      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          {isLoadingUser ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : isErrorUser ? (
            <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">Failed to load{isErrorUser }</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="mb-4">Manager Chain</h3>
                <div className="overflow-x-auto">
                  {!isLoadingUser && dataUser?.data && (
                    <ChartCard data={dataUser.data} id={id} />
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4">Direct Reports</h3>
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
      </div>
    </div>
  );
}
export default OrgChart;
