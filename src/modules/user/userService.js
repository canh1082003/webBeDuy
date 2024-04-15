import MySQLDatabase from "../../databases/MySQLDatabase.js";
import hashing from "../../utils/hashing.js";
const userRepo = MySQLDatabase.mysqlDataSource.getRepository("User");
class UserService {
  async findUserByEmail(email) {
    userRepo.findOne({ where: { email } });
  }
  async registerUser(userInfo) {
    const { firstName, lastName, email, password } = userInfo;
    const newUser = userRepo.create({
      firstName,
      lastName,
      email,
      password,
      isVerifyEmail: 1,
      role: "user",
    });
    return await userRepo.save(newUser);
  }
  async login(email, password) {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email not found");
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
}

export default new UserService();
