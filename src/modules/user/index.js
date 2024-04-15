import express from "express";
import userController from "./userController.js";
const UserRouter = express.Router();
UserRouter.post("/register", userController.register);
UserRouter.post("/login", userController.login);
export default UserRouter;
