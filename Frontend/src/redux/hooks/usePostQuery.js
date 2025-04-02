import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, allPost, deletePost, likePost, getAPost, rePost, feedPost,  createComment, deleteComment } from "../services/postService.js"; 
import toast from "react-hot-toast";

export const usePostQuery = (page = 1, postId = null) => {
    const queryClient = useQueryClient();

    const { data: postsData } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => allPost(page),
        enabled: !!page,
        // staleTime: 10000, 
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
            toast.success("Post deleted successfully!");
            queryClient.setQueryData(["posts", page], (currData) => {
                if (!currData) return [];
                return currData.filter(post => post.id !== postId); // Remove deleted post from cache
            });
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
        mutationFn: deleteComment, // ✅ Fix: Correct function
        onSuccess: (_, { postId, commentId }) => {
            // queryClient.setQueryData(["comments", postId], (currData) => {
            //     if (!currData) return [];
            //     return currData.filter(comment => comment.id !== commentId);
            // });
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
        deleteCommentMutation 
    };
};
