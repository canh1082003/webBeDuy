import MySQLDatabase from "../../databases/MySQLDatabase.js";
import hashing from "../../utils/hashing.js";
import { randomBytes } from "crypto";
const userRepo = MySQLDatabase.mysqlDataSource.getRepository("User");
class UserService {
  async findUserByEmail(email) {
    userRepo.findOne({ where: { email } });
  }
  async registerUser(userInfo) {
    const { firstName, lastName, email, password } = userInfo;
    const verifyEmailToken = randomBytes(8).toString("hex");
    const newUser = userRepo.create({
      firstName,
      lastName,
      email,
      password,
      verifyEmailToken,
      isVerifyEmail: 1,
      role: "user",
    });
    return await userRepo.save(newUser);
  }
  async login(email, password, res) {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const isCorrectPassword = await hashing.comparePassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      throw new Error("Incorrect password");
    }

    return user;
  }
  async findAndVerifyUser(verifyEmailToken) {
    const user = await userRepo.findOne({ where: { verifyEmailToken } });
    if (!user)
      return {
        message: `Not found any user with token ${verifyEmailToken}`,
      };

    if (user.isVerifyEmail)
      return {
        message: `Email verify already ${verifyEmailToken}`,
      };
    if (user.verifyEmailToken !== verifyEmailToken) {
      return {
        message: `Invalid token ${verifyEmailToken}`,
      };
    }

    user.isVerifyEmail = true;
    return await user.save();
  }
}

export default new UserService();
