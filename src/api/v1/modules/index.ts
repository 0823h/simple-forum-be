import { Router } from "express";
import UserRoute from "./users/user.route";
import PostRoute from "./posts/post.route";
import ReplyRoute from "./reply/reply.route";

const router = Router();
router.use("/users", UserRoute);
router.use("/posts", PostRoute);
router.use("/reply", ReplyRoute);

export default router;
