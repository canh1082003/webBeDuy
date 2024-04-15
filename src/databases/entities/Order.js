import { EntitySchema } from "typeorm";

const Order = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    OrderId: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    totalPrice: {
      type: "decimal",
      precision: 8,
      scale: 2,
      nullable: false,
    },
    currency: {
      type: "decimal",
      precision: 8,
      scale: 3,
      nullable: false,
    },
    userId: {
      type: "bigint",
      nullable: false,
    },
    deliveredAt: {
      type: "date",
      nullable: false,
    },
    createdAt: {
      type: "date",
      nullable: false,
    },
  },
});
export default Order;
