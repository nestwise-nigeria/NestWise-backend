const db = require('../database/db');
const { DataTypes } = require('sequelize');
const Plan = db.define(
    'Plan',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        maxProperties: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)
module.exports = Plan