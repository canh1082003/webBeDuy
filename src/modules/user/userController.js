import hashing from "../../utils/hashing.js";
import { generateToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mail.js";
import userService from "./userService.js";
// express-async-handler
class UserController {
  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const userExists = await userService.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({
          message: "user already exists",
        });
      }
      const hashedPassword = await hashing.hashPassword(password);
      const user = await userService.registerUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await sendEmail({
        email,
        subject: "Verify email",
        message: `Your verify token is ${user.verifyEmailToken} `,
      });
      return res.status(200).json({
        message: `Token đã được gửi đến${user.email} `,
        data: { email: user.email },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "register error",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.login(email, password, res);
      if (!user.isVerifyEmail) {
        return res.status(500).json({
          message: "Not verify yet",
        });
      }
      const token = generateToken(user.id, user.role);
      return res
        .status(200)
        .json({ message: "Login successfully", user, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "login error",
      });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { verifyEmailToken } = req.body;
      console.log(verifyEmailToken);
      await userService.findAndVerifyUser(verifyEmailToken);
      return res.status(200).json({ message: "Verified successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Verified Failed" });
    }
  }
  async UpdateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedUser = await userService.updateUser(id, updatedData);
      return res.status(200).json({
        updatedUser,
        Message: "Update Successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Update Failes" });
    }
  }
}
export default new UserController();
