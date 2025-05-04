const db = require('../database/db');
const { DataTypes } = require('sequelize');
const Subscription = db.define(
    'Subscription',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        agentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
        },
        planId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Plans',
              key: 'id'
            }
        },
        
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }
)
module.exports = Subscription