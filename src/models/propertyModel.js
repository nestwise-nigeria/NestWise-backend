const db = require('../database/db');
const { DataTypes } = require('sequelize');
const Property = db.define(
    'Property',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imageUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('sale', 'rent'),
            defaultValue: 'sale',
            allowNull: false
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        regularPrice: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false
        },
        discountPrice: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: true
        },
        offer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('available', 'rented', 'sold', 'pending'),
            defaultValue: 'available',
            allowNull: false
        },
        parking: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        furnished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
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
module.exports = Property