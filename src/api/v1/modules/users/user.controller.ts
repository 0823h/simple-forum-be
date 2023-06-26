import { Request, Response, NextFunction } from "express";
import UserService from "./user.services";
import { Request as JWTRequest } from "express-jwt";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register(req);
      return res.status(201).json({
        status: 201,
        message: "Success",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login(req);
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  };

  getUserInfo = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserInfo(req);
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default UserController;
