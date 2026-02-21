import { CircularProgress, Input, FormControl, InputLabel } from "@mui/material";
import { useGetActiveJobs } from "../Query/useQueries";
import JobCard from "../Components/JobCard";
import { useState } from "react";

function EmployeeJobListing() {
  const [search, setSearch] = useState("");
  const { isLoading, data, isError, refetch } = useGetActiveJobs(search);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>

      <div className="mb-6 max-w-md">
        <FormControl fullWidth size="small">
          <InputLabel htmlFor="search">Search Jobs</InputLabel>
          <Input
            type="text"
            placeholder="Search by title, department..."
            value={search}
            onChange={handleSearch}
          />
        </FormControl>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load jobs</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No jobs available</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((job) => (
            <JobCard key={job.jobId} data={job} view={"employee"} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeJobListing;