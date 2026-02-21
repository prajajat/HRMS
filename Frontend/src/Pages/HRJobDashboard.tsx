import { CircularProgress, Button } from "@mui/material";
import { useGetAllJobs } from "../Query/useQueries";
 
import { useState } from "react";
import CreateJobForm from "../Components/CreateJobForm";
import JobCard from "../Components/JobCard";

function HRJobDashboard() {
  const [createState, setCreateState] = useState(false);
  const [filters, setFilters] = useState({ status: true });
  const { isLoading, data, isError, refetch } = useGetAllJobs(filters);

  return (
    <div className="p-4">
      <h2 className="mb-4">Job Management</h2>

      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => setCreateState(!createState)}
          className="px-4 py-2 rounded  "
        >
          {createState ? "Cancel" : "Create New Job"}
        </Button>

        <Button
          onClick={() => setFilters({ ...filters, status: !filters.status })}
          className="px-4 py-2 bg-gray-600  rounded  "
        >
          {filters.status ? "Show All" : "Show Active"}
        </Button>
      </div>

      {createState && (
        <div className="mb-6">
          <CreateJobForm
            onSuccess={() => {
              setCreateState(false);
              refetch();
            }}
          />
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p >Failed to load jobs</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8">
          <p>No jobs found</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((job) => (
            <JobCard key={job.jobId} data={job} view={"hr"}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default HRJobDashboard;