import { useMutation, useQuery } from "@tanstack/react-query";
import { addComment, createPost, createTag, deleteComment, deletePost, getAllPosts, getAllTags, getComments, getPost, likeComment, likePost, replyComment, updateComment, updatePost } from "../apis/PostApis";
import queryClient from "../../../Query/Client";

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

