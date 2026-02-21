import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useGetAllJobs, useAddReviewer, useAddHr, useGetAllEmp, useGetALLUser } from "../Query/useQueries";
import { useForm } from "react-hook-form";

function HRJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobsData, isLoading } = useGetAllJobs({});
  const [activeTab, setActiveTab] = useState("details");
  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  });

 const {
    isLoading: isLoadingEmp,
    data: dataEmp,
    isError: isErrorEmp,
    refetch: refetchEmp,
  } = useGetALLUser();

  const { mutate: addReviewerMutation, isPending: isReviewerLoading } = useAddReviewer();
  const { mutate: addHrMutation, isPending: isHrLoading } = useAddHr();
 
  const job = jobsData?.data?.find((j: any) => j.jobId === parseInt(id));

  const handleAddReviewer = async (formData: any) => {
    const reviewerData = {
      userId: formData.eid,
    };

    addReviewerMutation(
      { jobId: parseInt(id), data: reviewerData },
      {
        onSuccess: (response: any) => {
          console.log("Reviewer added ", response);
          reset();
          setActiveTab("details");
          alert("Reviewer added !");
        },
        onError: (error: any) => {
          console.error("Error adding reviewer", error);
          alert("Failed to add reviewer.");
        },
      }
    );
  };

  const handleAddHr = async (formData: any) => {
    const hrData = {
       userId: formData.eid,
    };

    addHrMutation(
      { jobId: parseInt(id), data: hrData },
      {
        onSuccess: (response: any) => {
          console.log("HR added", response);
          reset();
          setActiveTab("details");
          alert("HR added!");
        },
        onError: (error: any) => {
          console.error("Error adding HR", error);
          alert("Failed to add HR.");
        },
      }
    );
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      ) : !job ? (
        <div className="p-4 rounded">
          <p className="text-red-600">Job not found</p>
        </div>
      ) : (
        <div className="max-w-4xl">
         
          <div className="bg-sky-50 rounded-lg p-6 mb-6">
            <h2 className="  mb-4">{job.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
               
              <div>
                <p >Status</p>
                <p >
                  <span className={`px-2 py-1 rounded ${job.status ? "bg-green-100 " : "bg-red-100  "}`}>
                    {job.status ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2">Description</p>
              <p className="whitespace-pre-wrap">{job.description || "No description"}</p>
            </div>

            {job.jobDescriptionUrl && (
              <div className="mb-6">
                <a
                  href={job.jobDescriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  View Job Description Document
                </a>
              </div>
            )}

           
            {job.reviewers && job.reviewers.length > 0 && (
              <div className="mb-6">
                <h3 className=" mb-2">CV Reviewers</h3>
                <div className="flex flex-wrap gap-2">
                  {job.reviewers.map((reviewer: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 rounded "
                    >
                          {reviewer.userName} {reviewer.companyEmail}
                    </span>
                  ))}
                </div>
              </div>
            )}

         
            {job.hrs && job.hrs.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2">Assigned HR</h3>
                <div className="flex flex-wrap gap-2">
                  {job.hrs.map((hr: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 rounded "
                    >
                      {hr.userName} {hr.companyEmail}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
 
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex ">
              <Button
                onClick={() => setActiveTab("details")}
              >
                Details
              </Button>
              <Button
                onClick={() => setActiveTab("reviewer")}
              >
                Add Reviewer
              </Button>
              <Button
                onClick={() => setActiveTab("hr")}
              >
                Add HR
              </Button>
            </div>

           
            <div className="p-6">
              {activeTab === "reviewer" && (
                <form onSubmit={handleSubmit(handleAddReviewer)} className="space-y-4">
                  <h3 className="mb-4">Add CV Reviewer</h3>
                  
                  
                <Select
                  type="number"
                  className="mt-10 mb-10 w-full"
                  {...register("eid",{
                     required: "Email is required",
                  })}
                >
                  {dataEmp?.data.map((emp) => {
                    return (
                      <MenuItem value={emp.userId}>
                        {" "}
                        {emp.name}-{emp.companyEmail}
                      </MenuItem>
                    );
                  })}
                </Select>


                  <Button
                    type="submit"
                    disabled={isReviewerLoading}
                    className="w-full"
                  >
                    {isReviewerLoading ? "Adding..." : "Add Reviewer"}
                  </Button>
                </form>
              )}

              {activeTab === "hr" && (
                <form onSubmit={handleSubmit(handleAddHr)} className="space-y-4">
                  <h3 className="mb-4">Add HR User</h3>
                  
                  <Select
                  type="number"
                  className="mt-10 mb-10 w-full"
                  {...register("eid",{
                     required: "Email is required",
                  })}
                >
                  {dataEmp?.data.map((emp) => {
                    return (
                      <MenuItem value={emp.userId}>
                        {" "}
                        {emp.name}-{emp.companyEmail}
                      </MenuItem>
                    );
                  })}
                </Select>

                  <Button
                    type="submit"
                    disabled={isHrLoading}
                    className="w-full"
                  >
                    {isHrLoading ? "Adding..." : "Add HR"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRJobDetails;