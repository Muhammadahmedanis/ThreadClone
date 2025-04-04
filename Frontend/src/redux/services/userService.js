import { axiosInstance } from "../../api/axios";

export const myDetail = () => axiosInstance.get('/user/myProfile').then(res => res.data);
export const userDetail = (userName) => axiosInstance.get(`/user/profile/${userName}`).then(res => res.data);
export const searchUser = (query) => axiosInstance.get(`/user/search/${query}`).then(res => res.data);
export const followUser = (id) => axiosInstance.put(`/user/follow/${id}`).then(res => res.data);