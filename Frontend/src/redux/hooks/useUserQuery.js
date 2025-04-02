import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { myDetail, userDetail, searchUser, followUser } from '../services/userService.js';

export const useUserQuery = (id = null, userName = null, query = null) => {
    const queryClient = useQueryClient();
    const { data: myInfo } = useQuery({
        queryKey: ["myInfo", id],
        queryFn: () => myDetail(id),
        enabled: !!id,
        staleTime: 10000, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("User info fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch user details"),
    });

    const { data: userInfo } = useQuery({
        queryKey: ["userInfo", userName],
        queryFn: () => userDetail(userName),
        enabled: !!userName,
        staleTime: 10000, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("User info fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch user details"),
    });

    const { data: queryUser } = useQuery({
        queryKey: ["queryUser", query],
        queryFn: () => searchUser(query),
        enabled: !!query,
        // staleTime: 10000, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("User info fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch user search results"),
    });

    const followUserMutation = useMutation({
        mutationFn: followUser, // ✅ Fix: Wrapped inside mutationFn
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries(["myInfo"]);
          queryClient.invalidateQueries(["userInfo", userName]);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Failed to follow user"),
    });

    return { myInfo, userInfo, queryUser, followUserMutation }
}