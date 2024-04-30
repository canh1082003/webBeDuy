import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "User",
  columns: {
    id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    firstName: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    lastName: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 250,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    verifyEmailToken: {
      type: "varchar",
      length: 255,
    },
    isVerifyEmail: {
      type: "tinyint",
      default: 0,
    },
    verifyEmailToken: {
      type: "varchar",
      length: 255,
    },
    role: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
  },
});
export default User;
