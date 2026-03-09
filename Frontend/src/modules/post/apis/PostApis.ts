import { instance } from "../../../Api/Axios";

export const getAllPosts = async (filters: any) =>
  await instance.get("/achievement/post/all", { params: filters }).then((res) => res);

export const getPost = async (postId: number) =>
  await instance.get(`/achievement/post/${postId}`).then((res) => res);

export const createPost = async (data: any, file?: File) => {
  const formData = new FormData();
  formData.append('postData', JSON.stringify(data));
  if (file) formData.append('mainDocument', file);
  return await instance.post("/achievement/post/create", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((res) => res);
};

export const updatePost = async (postId: number, data: any, file?: File) => {
  const formData = new FormData();
  formData.append('postData', JSON.stringify(data));
  if (file) formData.append('mainDocument', file);
  return await instance.put(`/achievement/post/${postId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((res) => res);
};

export const deletePost = async (postId: number) =>
  await instance.delete(`/achievement/post/${postId}`).then((res) => res);

export const likePost = async (postId: number) =>
  await instance.post(`/achievement/post/${postId}/like`).then((res) => res);

export const getComments = async (postId: number) =>
  await instance.get(`/achievement/comment/post/${postId}`).then((res) => res);

export const addComment = async (postId: number, data: any) =>
  await instance.post(`/achievement/comment/post/${postId}`, data).then((res) => res);

export const replyComment = async (commentId: number, data: any) =>
  await instance.post(`/achievement/comment/${commentId}/reply`, data).then((res) => res);

export const updateComment = async (commentId: number, desc: string) =>
  await instance.put(`/achievement/comment/${commentId}`, { desc }).then((res) => res);

export const deleteComment = async (commentId: number) =>
  await instance.delete(`/achievement/comment/${commentId}`).then((res) => res);

export const likeComment = async (commentId: number) =>
  await instance.post(`/achievement/comment/${commentId}/like`).then((res) => res);

export const getAllTags = async () =>
  await instance.get("/achievement/tag/all").then((res) => res);

export const createTag = async (data: any) =>
  await instance.post("/achievement/tag/create", data).then((res) => res);