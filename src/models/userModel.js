const db = require('../database/db');
const { DataTypes } = require('sequelize');

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
    },
    password: {
      // hashed password
        type: DataTypes.STRING,
        allowNull: false,        
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    idType: {
      type: DataTypes.ENUM('NIN', 'PVC', 'passport'),
      allowNull: true,
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idPicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  },
);
module.exports = User;
  