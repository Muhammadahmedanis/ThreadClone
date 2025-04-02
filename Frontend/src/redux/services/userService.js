import { axiosInstance } from "../../api/axios";

export const myDetail = (id) => axiosInstance.get(`/user/myProfile/${id}`).then(res => res.data);
export const userDetail = (userName) => axiosInstance.get(`/user/profile/${userName}`).then(res => res.data);
export const searchUser = (query) => axiosInstance.get(`/user/search/${query}`).then(res => res.data);
export const followUser = (userData, {id}) => axiosInstance.put(`/user/follow${id}`, userData).then(res => res.data);
