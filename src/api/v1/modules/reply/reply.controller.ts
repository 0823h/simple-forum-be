import { Request, Response, NextFunction } from "express";
import ReplyService from "./reply.services";
import { Request as JWTRequest } from "express-jwt";

class ReplyController {
  private replyService: ReplyService;

  constructor(replyService: ReplyService) {
    this.replyService = replyService;
  }

  createReply = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      return next(error);
    }
  };
}

export default ReplyController;
