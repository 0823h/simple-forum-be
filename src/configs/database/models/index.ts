import User from "./user.model";
import Post from "./post.model";
import Reply from "./reply.model";

const models: { associate?: () => Promise<void> } = {};

const associate = async (): Promise<void> => {
  Post.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
  });
  Reply.belongsTo(Post, {
    foreignKey: "post_id",
    targetKey: "id",
  });
  Reply.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
  });
};

models.associate = associate;

export default models;
