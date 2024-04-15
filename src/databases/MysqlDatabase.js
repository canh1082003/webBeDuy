import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Category from "./entities/Category.js";
import Order from "./entities/Order.js";
import OrderItem from "./entities/OrderItem.js";
import Product from "./entities/Product.js";
import User from "./entities/User.js";
dotenv.config();
class MySQLDatabase {
  mysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Category, Order, OrderItem, Product, User],
  });

  connect() {
    try {
      this.mysqlDataSource.initialize();
      console.log("Connected");
    } catch (error) {
      console.log(error);
      console.log("failed to connect");
    }
  }
}

export default new MySQLDatabase();
