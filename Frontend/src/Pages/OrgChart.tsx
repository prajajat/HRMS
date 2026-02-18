import { useNavigate, useParams } from "react-router-dom";
import { useGetALLUser, useGetUserById } from "../Query/useQueries";
import ChartCard from "../Components/ChartCard";
import { Box, MenuItem, Select } from "@mui/material";

function OrgChart() {
  const navigator = useNavigate();
  const { id } = useParams();
  const {
    isLoading: isLoadingAll,
    data: dataAll,
    isError: isErrorAll,
  } = useGetALLUser();

  const {
    isLoading: isLoadingUser,
    data: dataUser,
    isError: isErrorUser,
  } = useGetUserById(id);
  console.log(dataUser);

  return (
    <>
      <div className="flex flex-col bg-green-100">
        {!isLoadingAll && (
          <Select
            type="text"
            defaultValue=""
            className="mt-10 mb-10"
            onChange={(e) => navigator("/org-chart/" + e.target.value)}
          >
            {dataAll.data.map((e) => {
              return (
                <MenuItem value={e.userId}>
                  {e.name}- {e.companyEmail}
                </MenuItem>
              );
            })}
          </Select>
        )}
        Manager Chain
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            {!isLoadingUser && <ChartCard data={dataUser?.data} id={id} />}
            <br />
          </div>
        </div>
        Direct Reporters
        <br />
        <div className="flex flex-row">
          {!isLoadingUser &&
            dataUser?.data.teamMember.length > 0 &&
            dataUser?.data.teamMember.map((e) => {
              return <ChartCard key={e.userId} data={e} id={id} team={true} />;
            })}
        </div>
      </div>
    </>
  );
}
export default OrgChart;
