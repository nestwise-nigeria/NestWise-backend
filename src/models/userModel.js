const db = require('../database/db');
const { DataTypes } = require('sequelize')
const validator = require('validator');


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
      validate: {
        isValidPhone(value) {
          if (!validator.isMobilePhone(value, 'en-NG', { strictMode: true })) {
            throw new Error('Invalid phone number, valid Nigerian phone no format: +2348012345678');
          }
        }
      }
    },
    role: {
        type: DataTypes.ENUM('landlord', 'agent', 'agency', 'renter'),
        defaultValue: 'renter',
        allowNull: false,
        validate: {
          isIn: {
            args: [['landlord', 'agent', 'agency', 'renter']],
            msg: 'Role must be one of the following: landlord, agent, agency, renter',
          },
        },
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
      // hashed password
        type: DataTypes.STRING,
        allowNull: false,        
    },
  },
);

module.exports = User;
  