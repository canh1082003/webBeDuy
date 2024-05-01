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
      isVerifyEmail: 0,
      role: "user",
    });
    return await userRepo.save(newUser);
  }
  async login(email, password, res) {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
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
    if (!user) {
      throw new Error("");
    }

    if (user.isVerifyEmail !== "0") {
      throw new Error("");
    }
    if (user.verifyEmailToken !== String(verifyEmailToken)) {
      throw new Error("");
    }
    user.isVerifyEmail = 1;
    return await userRepo.save(user);
  }
  async updateUser(id, updatedData) {
    const userUpdate = await userRepo.findOne({ where: { id } });
    if (!userUpdate) {
      return res.json({ message: "User not found" });
    }

    Object.assign(userUpdate, updatedData);
    return await userRepo.save(userUpdate);
  }
}

export default new UserService();
