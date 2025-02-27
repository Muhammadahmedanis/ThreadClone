import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signupUser, signinUser, logoutUser, verifyOtp, resendOtp, updateUserProfile } from "../services/authService";

export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: signupUser, // ✅ Fix: Wrapped inside mutationFn
    onSuccess: (data) => {
      toast.success(data.message);
      if (data?.data) {
        localStorage.setItem("user", JSON.stringify({
          userName: data.data.userName,
          role: data.data.role,
          id: data.data._id
        }));
      }
    },
    onError: (error) => toast.error(error.response?.data?.message || "Signup failed"),
  });

  const signinMutation = useMutation({
    mutationFn: signinUser, // ✅ Fix
    onSuccess: (data) => {
      toast.success(data.message);
      if (data?.data) {
        localStorage.setItem("user", JSON.stringify({
          userName: data.data.userName,
          role: data.data.role,
          id: data.data._id
        }));
      }
      queryClient.invalidateQueries(["user"]); // Ensure user data refresh
    },
    onError: (error) => toast.error(error.response?.data?.message || "Signin failed"),
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser, // ✅ Fix
    onSuccess: () => {
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      queryClient.invalidateQueries(["user"]);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp, // ✅ Fix
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.response?.data?.message || "OTP verification failed"),
  });

  const resendOtpMutation = useMutation({
    mutationFn: resendOtp, // ✅ Fix
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.response?.data?.message || "OTP resend failed"),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile, // ✅ Fix
    onSuccess: (data) => {
      toast.success(data.message);
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (data?.data) {
        localStorage.setItem("user", JSON.stringify({
          ...storedUser,
          userName: data.data.userName
        }));
      }
      queryClient.invalidateQueries(["user"]); // Refresh user data after update
    },
    onError: (error) => toast.error(error.response?.data?.message || "Profile update failed"),
  });

  return { signupMutation, signinMutation, logoutMutation, verifyOtpMutation, resendOtpMutation, updateProfileMutation };
};
