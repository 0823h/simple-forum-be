import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.services";
import { auth } from "../../middlewares/auth.middleware";

const userService = new UserService();
const userController = new UserController(userService);

const userRoute = Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/about", auth, userController.getUserInfo);

export default userRoute;
