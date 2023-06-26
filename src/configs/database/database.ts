import { Sequelize, Dialect } from "sequelize";
import { config } from "dotenv";

config();
// console.log(process.env);
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

// console.log(
//   `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
// );
const db = {
  sequelize,
};

export default db;
