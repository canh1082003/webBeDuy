import hashing from "../../utils/hashing.js";
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
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "register error",
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.login(email, password, res);
      return res.status(200).json({ message: "Login successfully", user });
    } catch (error) {
      return res.status(500).json({
        message: "login error",
      });
    }
  }
}
export default new UserController();
