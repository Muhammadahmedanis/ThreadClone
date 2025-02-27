import { axiosInstance } from "../../api/axios";

export const signupUser = (userData) => axiosInstance.post("/auth/signup", userData).then(res => res.data);
export const signinUser = (userData) => axiosInstance.post("/auth/signin", userData).then(res => res.data);
export const logoutUser = () => axiosInstance.post("/auth/logout").then(res => res.data);
export const verifyOtp = (otp) => axiosInstance.post("/auth/verify-email", { otp }).then(res => res.data);
export const resendOtp = (userData) => axiosInstance.post("/auth/resend-otp", userData).then(res => res.data);
export const updateUserProfile = (userData) => axiosInstance.put("/user/updateProfile", userData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => res.data);
