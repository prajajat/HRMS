import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../../../Query/Client";
import { addHr, addReviewer, createJob, createJobReferral, getActiveJobs, getAllHr, getAllJobs, getUserReferrals, getUserShares, shareJob, updateJobStatus, updateReferralStatus  } from "../apis/JobApi";
 

export const useCreateJob = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useGetAllJobs = (filters: any) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getAllJobs(filters),
  });
};

export const useUpdateJobStatus = () => {
  return useMutation({
    mutationFn: ({ jobId, data }) => updateJobStatus(jobId, data),
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });

    },
  });
};

export const useAddReviewer = () => {
  return useMutation({
    mutationFn: ({ jobId, data }) => addReviewer(jobId, data),
    onSuccess: (response) => {
      console.log(response);
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useAddHr = () => {
  return useMutation({
    mutationFn: ({ jobId, data }) => addHr(jobId, data),
    onSuccess: (response) => {
      console.log(response);
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useCreateJobReferral = () => {
  return useMutation<any, any>({
    mutationFn: ({ jobId, data }) => createJobReferral(jobId, data),
    onSuccess: (response) => {
      console.log(response);
    },
  });
};



export const useGetActiveJobs = (search: string = "") => {
  return useQuery({
    queryKey: ["activeJobs", search],
    queryFn: () => getActiveJobs(search),
  });
};

export const useGetUserReferrals = () => {
  return useQuery({
    queryKey: ["userReferrals"],
    queryFn: getUserReferrals,
  });
};

export const useGetUserShares = () => {
  return useQuery({
    queryKey: ["userShares"],
    queryFn: getUserShares,
  });
};

export const useShareJob = () => {
  return useMutation({
    mutationFn: ({ jobId, data }) => shareJob(jobId, data),
    onSuccess: (response) => {
      console.log(response);
    },
  });
};



export const useGetALLHr = () => {
  return useQuery({ queryKey: ["user_hr"], queryFn: getAllHr });
};

export const useUpdateReferralStatus = () => {
  return useMutation({
    mutationFn: (data: any) => updateReferralStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReferrals"] });
    },
  });
};


 