import { DataTypes, Model, ModelStatic } from "sequelize";
import db from "../database";
import User from "./user.model";
import Post from "./post.model";

export interface IReply extends Model {
  id: number;
  user_id: number;
  post_id: number;
  reply_content: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Reply = db.sequelize?.define<IReply>(
  "Reply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
    reply_content: {
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
) as ModelStatic<IReply>;

export default Reply;
