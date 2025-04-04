import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, allPost, deletePost, likePost, getAPost, rePost, feedPost,  createComment, deleteComment, topLikePost } from "../services/postService.js"; 
import toast from "react-hot-toast";

export const usePostQuery = (page = 1, postId = null) => {
    const queryClient = useQueryClient();

    const { data: postsData } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => allPost(page),
        enabled: !!page,
        staleTime: 60000,
        keepPreviousData: true, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("Posts fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch posts"),
    });
    const posts = postsData?.message || [];
    
    const { data: posta } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getAPost(postId),
        enabled: !!postId, // Only fetch if postId exists
        staleTime: 10000, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("Single post fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch post"),
    });
    const post = posta?.data || [];
    

    const { data: trendPost } = useQuery({
        queryKey: ["trendPost"],
        queryFn: topLikePost,
        // enabled: !!postId, // Only fetch if postId exists
        staleTime: 10000, 
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log("trend post fetched:", data),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to fetch trend post"),
    });

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["posts"]); // Refetch posts after creation
        },
        onError: (error) => toast.error(error.response?.data?.message || "Create post failed"),
    });

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: (_, postId) => {
        //     queryClient.setQueryData(["posts", page], (currData) => 
        //         currData ? currData.filter(post => post._id !== postId) : []
        // );
            queryClient.invalidateQueries(["posts", postId]);
            toast.success("Post deleted successfully!");
        },
        onError: (error) => toast.error(error.response?.data?.message || "Delete post failed"),
    });

    const likePostMutation = useMutation({
        mutationFn: ({ postId, action }) => likePost(postId, action),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["posts"]); // Refresh posts after liking
        },
        onError: (error) => toast.error(error.response?.data?.message || "Like post failed"),
    });

    const rePostMutation = useMutation({
        mutationFn: rePost,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["posts"]);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Repost failed"),
    });


    // Comment
    const createCommentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["comments", postId]); // Refresh comments for the post
        },
        onError: (error) => toast.error(error.response?.data?.message || "Create comment failed"),
    });

    const deleteCommentMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, { postId, commentId }) => {
            // Instantly update cache to remove the deleted comment
            // queryClient.setQueryData(["comments", postId], (currData) => 
            //     currData ? currData.filter(comment => comment._id !== commentId) : []
            // );
            // (Optional) Refetch the comments to ensure fresh data
            queryClient.invalidateQueries(["comments", postId]);
            toast.success("Comment deleted successfully!");
        },
        onError: (error) => toast.error(error.response?.data?.message || "Delete comment failed"),
    });
    

    return { 
        createPostMutation, 
        posts, 
        post, 
        deletePostMutation, 
        likePostMutation, 
        rePostMutation, 
        createCommentMutation, 
        deleteCommentMutation,
        trendPost,
    };
};
