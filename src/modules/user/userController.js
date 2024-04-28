import hashing from "../../utils/hashing.js";
import userService from "./userService.js";
// express-async-handler
class UserController {
  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    console.log(await hashing.hashPassword(password));
    const hashedPassword = await hashing.hashPassword(password);
    console.log(hashedPassword);
    const user = await userService.registerUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(user);
  }
  async login(req, res) {
    const { email, password } = req.body;

    const user = await userService.login(email, password, res);
    return res.status(200).json({ message: "Login successfully", user });
  }
}
export default new UserController();
