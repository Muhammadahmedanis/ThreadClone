import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createComment, deleteComment } from "../controllers/comment.controller.js";

const commentRouter = Router();
commentRouter.route("/create/:id").post(verifyJwt, createComment);
commentRouter.route("/delete/:postId/:commentId").delete(verifyJwt, deleteComment);

export default commentRouter;