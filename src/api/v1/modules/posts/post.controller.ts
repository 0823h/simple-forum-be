import { Request, Response, NextFunction } from "express";
import PostService from "./post.services";
import { Request as JWTRequest } from "express-jwt";
import { io } from "../../../../server";

class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  createPost = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.createPost(req);
      io.emit("refresh-data");
      return res.status(201).json({
        status: 201,
        message: "success",
        data: post,
      });
    } catch (error) {
      return next(error);
    }
  };

  getPosts = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getPosts(req);
      return res.status(200).json({
        status: 200,
        message: "success",
        data: posts,
      });
    } catch (error) {
      return next(error);
    }
  };

  createReply = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const reply = await this.postService.createReply(req);
      return res.status(201).json({
        status: 201,
        message: "success",
        data: reply,
      });
    } catch (error) {
      return next(error);
    }
  };

  getReplies = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const replies = await this.postService.getReplies(req);
      return res.status(200).json({
        status: 200,
        message: "success",
        data: replies,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default PostController;
