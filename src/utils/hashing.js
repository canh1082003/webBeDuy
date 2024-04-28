import bcrypt from "bcrypt";
class Hashing {
  async hashPassword(plainTextPassword) {
    console.log("111111111111111111s");
    return await bcrypt.hash(plainTextPassword, 10);
  }

  async comparePassword(plainTextPassword, hashPassword) {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}
export default new Hashing();
