const db = require('../database/db');
const { DataTypes } = require('sequelize')
const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('landlord', 'agent', 'agency', 'renter'),
        defaultValue: 'renter',
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
);

module.exports = User;
  