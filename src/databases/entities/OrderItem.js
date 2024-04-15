import { EntitySchema } from "typeorm";

const OrderItem = new EntitySchema({
  name: "OrderItem",
  tableName: "OrderItem",
  columns: {
    id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    productId: {
      type: "bigint",
      nullable: false,
    },
    quantity: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: true,
    },
  },
});
export default OrderItem;
