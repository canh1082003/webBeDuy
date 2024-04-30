import express from "express";
import userController from "./userController.js";
import {
  GetVerifyEmailTokenMiddleWare,
  LoginMiddleware,
  RegisterMiddleware,
} from "../../middleware/user.middleware.js";
const UserRouter = express.Router();
UserRouter.post("/register", RegisterMiddleware, userController.register);
UserRouter.post("/login", LoginMiddleware, userController.login);
UserRouter.post(
  "/verify-email",
  GetVerifyEmailTokenMiddleWare,
  userController.verifyEmail
);
export default UserRouter;
