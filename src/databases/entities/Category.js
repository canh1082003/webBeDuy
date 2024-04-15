import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "Category",
  tableName: "Category",
  columns: {
    id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
  },
});
export default User;
