import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createRateLimiter } from "../middlewares/rate-limiting.middlware.js";
import { createPost, deletePost, getAllPost, getFeed, getPost, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middlware.js"

const postRouter = Router();
postRouter.route("/create").post(verifyJwt, upload.single("img"), createPost);
postRouter.route("/").get(getAllPost);
postRouter.route("/feed").get(verifyJwt, getFeed);
postRouter.route("/:postId").get(verifyJwt, getPost);
postRouter.route("/:postId").delete(verifyJwt, deletePost);
postRouter.route("/likePost/:postId").post(verifyJwt, likeUnlikePost);
postRouter.route("/replies/:postId").post(verifyJwt, replyToPost);

export default postRouter; 