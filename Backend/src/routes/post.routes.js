import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createRateLimiter } from "../middlewares/rate-limiting.middlware.js";
import { createPost, deletePost, getAllPost, getFeed, getPost, getTopLikePost, likeUnlikePost, repost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middlware.js"

const postRouter = Router();
postRouter.route("/create").post(verifyJwt, upload.single("img"), createPost);
postRouter.route("/").get(getAllPost);
postRouter.route("/trend").get(getTopLikePost);
postRouter.route("/feed").get(verifyJwt, getFeed);
postRouter.route("/:postId").get(verifyJwt, getPost);
postRouter.route("/:postId").delete(verifyJwt, deletePost);
postRouter.route("/likePost/:postId").put(verifyJwt, likeUnlikePost);
postRouter.route("/repost/:postId").put(verifyJwt, repost);

export default postRouter; 