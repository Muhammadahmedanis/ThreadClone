import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { followUnfollowUser, getUserProile, myDetail, SearchUser, updateProfile } from "../controllers/user.controller.js";
import { createRateLimiter } from "../middlewares/rate-limiting.middlware.js";
import { upload } from "../middlewares/multer.middlware.js"

const userRouter = Router();
userRouter.route("/profile/:userName").get(createRateLimiter(1 * 60 * 1000, 10, "Too much get request hit, please try again after One minute"),getUserProile);
userRouter.route("/search/:query").get(verifyJwt, SearchUser);
userRouter.route("/myProfile").get(createRateLimiter(1 * 60 * 1000, 10, "Too much get request hit, please try again after One minute"), verifyJwt, myDetail);
userRouter.route("/follow/:id").put(createRateLimiter(2 * 60 * 1000, 10, "Too much follow request hit, please try again after five minute"),verifyJwt, followUnfollowUser);
userRouter.route("/updateProfile").put(verifyJwt, upload.single("img"), updateProfile);

export default userRouter;