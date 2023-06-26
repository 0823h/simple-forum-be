import { DataTypes, Model, ModelStatic } from "sequelize";
import db from "../database";
import User from "./user.model";

export interface IPost extends Model {
  id: number;
  user_id: number;
  post_title: string;
  post_content: string;
  is_published: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Post = db.sequelize?.define<IPost>(
  "Post",
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
    post_title: {
      type: DataTypes.STRING,
    },
    post_content: {
      type: DataTypes.TEXT,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    paranoid: true,
  }
) as ModelStatic<IPost>;

export default Post;
