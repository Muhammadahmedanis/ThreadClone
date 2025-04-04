import { axiosInstance } from "../../api/axios";

export const createPost = (userData) => axiosInstance.post("/post/create", userData, 
    { headers: { "Content-Type": "multipart/form-data" } 
}).then(res => res.data);
export const allPost = (page) => axiosInstance.get(`/post?page=${page}`).then(res => res.data);
export const getAPost = (postId) => axiosInstance.get(`/post/${postId}`).then(res => res.data);
export const topLikePost = () => axiosInstance.get('/post/trend').then(res => res.data);
export const feedPost = () => axiosInstance.get('/post/feed').then(res => res.data);
export const deletePost = (postId) => axiosInstance.delete(`/post/${postId}`).then(res => res.data);
export const rePost = (userData, postId) => axiosInstance.put(`/post/repost/${postId}`, userData).then(res => res.data);
export const likePost = (postId) => axiosInstance.put(`/post/likePost/${postId}`).then(res => res.data);


//Comment
export const createComment = ({ text, postId }) => axiosInstance.post(`/comment/create/${postId}`, { text } ).then(res => res.data);
export const deleteComment = ({postId, commentId}) => axiosInstance.delete(`/comment/delete/${postId}/${commentId}`).then(res => res.data);