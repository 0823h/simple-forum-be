import Reply, { IReply } from "../../../../configs/database/models/reply.model";
import { ModelStatic } from "sequelize";
import { Request as JWTRequest } from "express-jwt";
import { JwtPayload } from "jsonwebtoken";
import User from "../../../../configs/database/models/user.model";

class ReplyService {
  private readonly replyModel: ModelStatic<IReply>;
  constructor() {
    this.replyModel = Reply;
  }

  createReply = async () => {};
}
export default ReplyService;
