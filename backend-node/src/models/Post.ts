
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class Post extends Model {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public content!: string;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: false,
  }
);

// ✅ Define Relationship
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Post;
