import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginApi,
  getAllTravelDetails,
  getTravelDetailsById,
  getAllEmp,
  AssignTravelEmp,
  RemoveTravelEmp,
  getTravelByUser,
  CreateTravel,
  getExpenceBytraveler,
  getDocumentsBytraveler,
  CreateExpense,
  CreateDocument,
  getDocuments,
  getAllExpence,
  patchExpense,
  getALLUser,
  getUserById,
  getDocumentsByManager,
  Refresh,
  getALLGames,
  getGameDetailsById,
  CreateBooking,
  cancelBooking,
  getAllNotification,
  updateGameConfig,
  getGameConfigById,
  createJob,
  getAllJobs,
  updateJobStatus,
  addReviewer,
  addHr,
  createJobReferral,
  getActiveJobs,
  getUserReferrals,
  getUserShares,
  shareJob,
  getSystemConfig,
  updateSystemConfig,
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getComments,
  addComment,
  replyComment,
  updateComment,
  deleteComment,
  likeComment,
  getAllTags,
  createTag,
  updateInterest,
  getTeamMember,
  getNewNotificationCount,
  getAllHr,
  updateReferralStatus,
} from "../Api/Axios";
import queryClient from "./Client";

export const useLogin = () => {
  console.log("jiji");
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log(response);

      // queryClient.invalidateQueries(['profile']
    },
  });
};

export const useCreateTravel = () => {
  return useMutation({
    mutationFn: CreateTravel,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useCancelBooking = () => {
  return useMutation<any>({
    mutationFn: ({ id }) => cancelBooking(id),
    onSuccess: (response) => {
      response;
    },
  });
};

export const useAssignTravelEmp = () => {
  console.log("okok");
  return useMutation({
    mutationFn: AssignTravelEmp,
    onSuccess: (response) => {
      console.log(response);

      //queryClient.invalidateQueries(["travel"]);
    },
  });
};

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: CreateExpense,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useUpdateGameConfig = () => {
  return useMutation({
    mutationFn: updateGameConfig,
    onSuccess: (response) => {
      alert(response.data.message);
    },
  });
};

export const useCreateDocument = () => {
  return useMutation({
    mutationFn: CreateDocument,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useRemoveTravelEmp = () => {
  console.log("remove emp to travel");
  return useMutation({
    mutationFn: RemoveTravelEmp,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: CreateBooking,
    onSuccess: (response) => {
      alert(response.data.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePatchExpense = () => {
  console.log("patch expense");
  return useMutation<any, any, any>({
    mutationFn: ({ eId, userId, dto }) => patchExpense(eId, userId, dto),
    onSuccess: (response) => {
      console.log(response);
      // queryClient.invalidateQueries("expences");
    },
  });
};

export const useGetAllTravel = () => {
  return useQuery({ queryKey: ["travel"], queryFn: getAllTravelDetails });
};
export const useRefresh = () => {
  return useQuery({ queryKey: ["refresh", Date.now], queryFn: Refresh });
};

export const useGetTravelByUser = () => {
  return useQuery({ queryKey: ["traveler-travel"], queryFn: getTravelByUser });
};

export const useGetAllEmp = () => {
  return useQuery({ queryKey: ["allemp"], queryFn: getAllEmp });
};

export const useGetGameConfigById = (id) => {
  return useQuery({
    queryKey: ["gameConfig", id],
    queryFn: () => getGameConfigById(id),
  });
};

export const useGetAllNotification = () => {
  return useQuery({ queryKey: ["notification"], queryFn: getAllNotification });
};

export const useGetNewNotificationCount = () => {
  return useQuery({ queryKey: ["notificationCount"], queryFn: getNewNotificationCount });
};

export const useGetExpenceBytraveler = (id, search) => {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: () => getExpenceBytraveler(id),
    enabled: !!id,
  });
};

export const useGetDocumentByManager = (id) => {
  return useQuery({
    queryKey: ["documentsByManager", id],
    queryFn: () => getDocumentsByManager(id),
    enabled: !!id,
  });
};

export const useGetAllExpence = (id, search: String) => {
  console.log(search);
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => getAllExpence(search),
  });
};

export const useGetDocumentsBytraveler = (id) => {
  return useQuery({
    queryKey: ["travelerDoc", id],
    queryFn: () => getDocumentsBytraveler(id),
    enabled: !!id,
  });
};

export const useGetDocuments = () => {
  return useQuery({ queryKey: ["travelerDoc-"], queryFn: getDocuments });
};

export const useGetTeamMember = () => {
  return useQuery({ queryKey: ["teamMember"], queryFn: getTeamMember });
};
export const useGetTravelById = (id) => {
  return useQuery({
    queryKey: ["travel-", id],
    queryFn: () => getTravelDetailsById(id),
    enabled: !!id,
  });
};

export const useGetALLUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: getALLUser });
};
export const useGetALLHr = () => {
  return useQuery({ queryKey: ["user_hr"], queryFn: getAllHr });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user-", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useGetAllGames = () => {
  return useQuery({ queryKey: ["games"], queryFn: getALLGames });
};

export const useGetGameDetailsById = (id) => {
  return useQuery({
    queryKey: ["gamedetails", id],
    queryFn: () => getGameDetailsById(id),
    enabled: !!id,
  });
};

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

export const useUpdateInterest = () => {
  return useMutation({
    mutationFn: updateInterest,
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

export const useGetSystemConfig = () => {
  return useQuery({
    queryKey: ["systemConfig"],
    queryFn: () => getSystemConfig().then((res) => res.data),
  });
};

export const useUpdateSystemConfig = () => {
  return useMutation({
    mutationFn: updateSystemConfig,
    onSuccess: (response) => {
      console.log(response);
    },
  });
};
// Achievement Queries - Posts
export const useGetAllPosts = (filters: any = {}) => {
  return useQuery({
    queryKey: ["posts", filters],
    queryFn: () => getAllPosts(filters).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetPost = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId).then((res) => res.data),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({ data, file }: { data: any; file?: File }) =>
      createPost(data, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({
      postId,
      data,
      file,
    }: {
      postId: number;
      data: any;
      file?: File;
    }) => updatePost(postId, data, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Achievement Queries - Comments
export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId).then((res) => res.data),
    enabled: !!postId,
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: any }) =>
      addComment(postId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

export const useReplyComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      data,
      postId,
    }: {
      commentId: number;
      data: any;
      postId: number;
    }) => replyComment(commentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      desc,
      postId,
    }: {
      commentId: number;
      desc: string;
      postId: number;
    }) => updateComment(commentId, desc),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      postId,
    }: {
      commentId: number;
      postId: number;
    }) => deleteComment(commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

export const useLikeComment = () => {
  return useMutation({
    mutationFn: (commentId: number) => likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// Achievement Queries - Tags
export const useGetAllTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags().then((res) => res.data),
    staleTime: 60 * 60 * 1000,
  });
};

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (data: any) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useUpdateReferralStatus = () => {
  return useMutation({
    mutationFn: (data: any) => updateReferralStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReferrals"] });
    },
  });
};
