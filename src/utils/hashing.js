import bcrypt from "bcrypt";
class Hashing {
  async hashPassword(plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, 10);
  }

  async comparePassword(plainTextPassword, hashPassword) {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}
export default new Hashing();
