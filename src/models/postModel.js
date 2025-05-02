const db = require('../database/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel')
const Post = db.define(
    'Post',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('draft', 'published'),
            defaultValue: 'draft',
            allowNull: false
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
          }
    }
)

// Define the association
Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

module.exports = Post