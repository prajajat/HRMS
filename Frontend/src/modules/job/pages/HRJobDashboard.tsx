import { CircularProgress, Button, Typography } from "@mui/material";
 

import { useState } from "react";
import { useGetAllJobs } from "../../../Query/useQueries";
import CreateJobForm from "../components/CreateJobForm";
import JobCard from "../components/JobCard";
 

function HRJobDashboard() {

  const { isLoading, data, isError, refetch } = useGetAllJobs({});

    const [createState, setCreateState] = useState(false); 

  return (
    <div className="p-4">
      <Typography fontSize={36}>Job Management </Typography>
      <hr />
      <br />

      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => setCreateState(!createState)}
          className="px-4 py-2 rounded  "
        >
          {createState ? "Cancel" : "Create New Job"}
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
          <p>Failed to load jobs</p>
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
            <JobCard key={job.jobId} data={job} view={"hr"} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HRJobDashboard;