import Post, { IPost } from "../../../../configs/database/models/post.model";
import Reply, { IReply } from "../../../../configs/database/models/reply.model";
import { ModelStatic } from "sequelize";
import { Request as JWTRequest } from "express-jwt";
import { JwtPayload } from "jsonwebtoken";
import User from "../../../../configs/database/models/user.model";

class PostService {
  private readonly postModel: ModelStatic<IPost>;
  private readonly replyModel: ModelStatic<IReply>;
  constructor() {
    this.postModel = Post;
    this.replyModel = Reply;
  }

  createPost = async (req: JWTRequest) => {
    try {
      const { user_id } = (<JwtPayload>req.auth).data;
      const post_count = (await this.postModel.findAndCountAll()).count;
      const post = await this.postModel.create({
        id: post_count,
        user_id,
        ...req.body,
      });
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getPosts = async (req: JWTRequest) => {
    try {
      const posts = await this.postModel.findAndCountAll({
        include: [{ model: User }],
      });
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createReply = async (req: JWTRequest) => {
    try {
      const { post_id } = req.params;
      const { user_id } = (<JwtPayload>req.auth).data;
      const reply_number = (await this.replyModel.findAndCountAll()).count;
      const reply = await this.replyModel.create({
        id: reply_number,
        user_id,
        post_id,
        ...req.body,
      });

      return reply;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getReplies = async (req: JWTRequest) => {
    try {
      const { post_id } = req.params;
      const replies = await this.replyModel.findAndCountAll({
        where: { post_id: post_id },
        include: { model: User },
      });
      // const replies = await this.replyModel.findAndCountAll();
      return replies;
    } catch (error) {
      throw error;
    }
  };
}

export default PostService;
