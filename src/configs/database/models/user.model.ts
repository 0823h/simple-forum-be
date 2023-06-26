import { DataTypes, Model, ModelStatic } from "sequelize";
import db from "../database";

export interface IUser extends Model {
  id: number;
  full_name: string;
  username: string;
  password: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const User = db.sequelize?.define<IUser>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
) as ModelStatic<IUser>;

export default User;
