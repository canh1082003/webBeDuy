import { EntitySchema } from "typeorm";
const Product = new EntitySchema({
  name: "Product",
  tableName: "Product",
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
    price: {
      type: "decimal",
      precision: 8,
      scale: 2,
      nullable: false,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    imgUrl: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    categoryId: {
      type: "bigint",
      nullable: false,
    },
  },
  relations: {
    category: {
      type: "many-to-one",
      target: "Category",
      joinColumn: true,
    },
  },
});
export default Product;
