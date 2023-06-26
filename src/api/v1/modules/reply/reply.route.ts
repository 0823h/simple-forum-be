import { Router } from "express";
import ReplyController from "./reply.controller";
import ReplyService from "./reply.services";
import { auth } from "../../middlewares/auth.middleware";

const replyService = new ReplyService();
const replyController = new ReplyController(replyService);

const replyRoute = Router();

export default replyRoute;
