import User, { IUser } from "../../../../configs/database/models/user.model";
import { Request as JWTRequest } from "express-jwt";
import { ModelStatic } from "sequelize";
import { HttpException } from "../../utils/http-exception";
import { generateToken } from "../../utils/functions";
import { JwtPayload } from "jsonwebtoken";

class UserService {
  private readonly userModel: ModelStatic<IUser>;
  constructor() {
    this.userModel = User;
  }

  register = async (req: JWTRequest) => {
    try {
      const { username } = req.body;
      const user_existed = await this.userModel.findOne({
        where: { username },
      });
      if (user_existed) {
        throw new HttpException("Username has been taken", 400);
      }

      const users_number = (await this.userModel.findAndCountAll()).count;

      const user = await this.userModel.create({
        id: users_number,
        ...req.body,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  login = async (req: JWTRequest) => {
    try {
      const { username, password } = req.body;
      const user_existed = await this.userModel.findOne({
        where: { username },
      });
      if (!user_existed) {
        throw new HttpException("Username not found", 404);
      }

      if (password !== user_existed.password) {
        throw new HttpException("Wrong password", 400);
      }

      const token = await generateToken(
        `${process.env.ACCESS_TOKEN_SECRET_KEY}`,
        { user_id: user_existed.id },
        `${process.env.ACCESS_TOKEN_TIME_EXPIRED}`
      );

      return { user_existed, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getUserInfo = async (req: JWTRequest) => {
    try {
      const { user_id } = (<JwtPayload>req.auth).data;
      // console.log(<JwtPayload>req.auth);
      const user = await this.userModel.findOne({
        where: { id: user_id },
      });

      if (!user) {
        throw new HttpException("User not found", 404);
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  };
}
export default UserService;
