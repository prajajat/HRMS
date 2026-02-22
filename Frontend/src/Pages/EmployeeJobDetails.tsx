import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useGetAllJobs, useCreateJobReferral, useShareJob } from "../Query/useQueries";
import { useForm } from "react-hook-form";

function EmployeeJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobsData, isLoading } = useGetAllJobs({});
  const [activeAction, setActiveAction] = useState<"view" | "referral" | "share">("view");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  });

  const { mutate: createReferral, isPending: isReferralLoading } = useCreateJobReferral();
  const { mutate: shareJobMutation, isPending: isShareLoading } = useShareJob();

 
  const job = jobsData?.data?.find((j: any) => j.jobId === parseInt(id));

  const handleCreateReferral = async (formData: any) => {
    if (!cvFile) {
      alert("Please select a CV file");
      return;
    }

    const referralFormData = new FormData();
    const referralDTO = {
      friendName: formData.friendName,
      friendMail: formData.friendMail,
      shortNote: formData.shortNote || "",
    };

    referralFormData.append("referData", JSON.stringify(referralDTO));
    referralFormData.append("cv", cvFile);

    createReferral(
      { jobId: parseInt(id), data: referralFormData },
      {
        onSuccess: (response: any) => {
          console.log("Referral created", response);
          reset();
          setCvFile(null);
          setActiveAction("view");
          alert("Referral submitted!");
        },
        onError: (error: any) => {
          alert("Failed to submit referral");
        },
      }
    );
  };

  const handleShareJob = async (formData: any) => {
    const shareData = {
      receiverMail: formData.receiverMail,
    };

    shareJobMutation(
      { jobId: parseInt(id), data: shareData },
      {
        onSuccess: (response: any) => {
          console.log("Job shared successfully", response);
          reset();
          setActiveAction("view");
          alert("Job shared successfully!");
        },
        onError: (error: any) => {
          console.error("Error sharing job", error);
          alert("Failed to share job.");
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
        <div className="p-4 bg-red-50  rounded">
          <p >Job not found</p>
        </div>
      ) : (
        <div className="max-w-4xl">
    
          <div className="bg-sky-100 rounded-lg p-6 mb-6">
            <h2 className="mb-4">{job.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p>Department</p>
                <p>{job.department || "N/A"}</p>
              </div>
              <div>
                <p >Posted By</p>
                <p>{job.createdByName || "HR Team"}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2">Description</p>
              <p >{job.description || "No description"}</p>
            </div>

            {job.jobDescriptionUrl && (
              <div className="mb-6">
                <a
                  href={job.jobDescriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                 
                >
                 View Full Job Description
                </a>
              </div>
            )}
          </div>

        
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h3 className="mb-4">What would you like to do?</h3>
            
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setActiveAction("view")} 
              >
                View Details
              </Button>
              
              <Button
                onClick={() => setActiveAction("referral")}
              >
                Make Referral
              </Button>
              
              <Button
                onClick={() => setActiveAction("share")}
              >
                Share Job
              </Button>
            </div>
          </div>
 
          {activeAction === "referral" && (
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="mb-4">Make a Referral</h3>
              <p className="mb-4">Refer a friend for this job position</p>
              
              <form onSubmit={handleSubmit(handleCreateReferral)} className="space-y-4">
                <TextField 
                  label="friend name"
                  fullWidth
                  required
                  disabled={isReferralLoading}
                  {...register("friendName", {
                    required: "Friend's name is required"
                  })}
                />

                <TextField 
                   label="friend mail"
                  type="email"
                  fullWidth
                  required
                  disabled={isReferralLoading}
                  {...register("friendMail", {
                    required: "Friend's email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                />

                <TextField 
                  label="note"
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isReferralLoading}
                  {...register("shortNote")}
                  placeholder="Why would your friend be a good fit for this role?"
                />

                <div>
                  <label className="mb-2">
                    Upload Friend's CV (PDF)
                  </label>
                  <input
                    type="file" 
                    required
                    disabled={isReferralLoading}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setCvFile(files[0]);
                      }
                    }}
                     
                  />
                  {cvFile && (
                    <p className="mt-2">Selected: {cvFile.name}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isReferralLoading}
                    
                  >
                    {isReferralLoading ? "Submitting..." : "Submit Referral"}
                  </Button>
                  
                  <Button
                    type="button"
                    disabled={isReferralLoading}
                    onClick={() => {
                      reset();
                      setCvFile(null);
                      setActiveAction("view");
                    }}
                     >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeAction === "share" && (
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="mb-4">Share This Job</h3>
              <p className="mb-4">Share this job opportunity with someone</p>
              
              <form onSubmit={handleSubmit(handleShareJob)} className="space-y-4">
                <TextField
                  label="Recipient Email"
                  type="email"
                  fullWidth
                  required
                  disabled={isShareLoading}
                  {...register("receiverMail", {
                    required: "Recipient email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                   
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isShareLoading}
                    >
                    {isShareLoading ? "Sharing..." : "Share Job"}
                  </Button>
                  
                  <Button
                    type="button"
                    disabled={isShareLoading}
                    onClick={() => {
                      reset();
                      setActiveAction("view");
                    }}
                     
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeJobDetails;