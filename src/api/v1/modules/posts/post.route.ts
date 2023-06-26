import { Router } from "express";
import PostController from "./post.controller";
import PostService from "./post.services";
import { auth } from "../../middlewares/auth.middleware";

const postService = new PostService();
const postController = new PostController(postService);

const postRoute = Router();

postRoute.post("/", auth, postController.createPost);
postRoute.get("/", postController.getPosts);
postRoute.post("/:post_id/reply", auth, postController.createReply);
postRoute.get("/:post_id/reply", postController.getReplies);

export default postRoute;
