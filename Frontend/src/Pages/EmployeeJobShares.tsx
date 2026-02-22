import { CircularProgress } from "@mui/material";
import { useGetUserShares } from "../Query/useQueries";
import JobCard from "../Components/JobCard";
import JobShareCard from "../Components/JobShareCard";

function EmployeeJobShares() {
  const { isLoading, data, isError } = useGetUserShares();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Shared Jobs</h2>

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 rounded">
          <p >Failed to load shared jobs</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8">
          <p>No jobs shared with you</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((job) => (
            <JobShareCard data={job}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeJobShares;