import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
const hostName = process.env.DB_HOST;
import router from "./routers/router.js";
import MySQLDatabase from "./databases/MySQLDatabase.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

app.listen(port, hostName, () => {
  MySQLDatabase.connect();
  console.log(`Example app listening ${hostName}:${port}`);
});
