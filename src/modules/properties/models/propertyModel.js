const db = require('../../../database/db');
const { DataTypes } = require('sequelize');
const Property = db.define(
    'Property',
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        property_type: {
            type: DataTypes.ENUM('land', 'office', 'apartment', 'house'),
            defaultValue: 'land',
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('available', 'rented', 'sold', 'pending'),
            defaultValue: 'available',
            allowNull: false
        },
        listing_type: {
            type: DataTypes.ENUM('sale', 'rent'),
            defaultValue: 'sale',
            allowNull: false

        },
        bathroom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        bedroom: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        square_feet: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true

        },
        address: {
            type: DataTypes.STRING,
            allowNull: false

        },
        city: {
            type: DataTypes.STRING,
            allowNull: false

        },
        state: {
            type: DataTypes.STRING,
            allowNull: false

        }
        // landlord: {
        //     type: DataTypes.UUID,
        //     allowNull: true,
        //     // references: {
        //     // model: User,
        //     // key: "id",
        //     // },

        // },
        // agent: {
        //     type: DataTypes.UUID,
        //     allowNull: true,
        //     // references: {
        //     // model: User,
        //     // key: "id",
        //     // },

        // }
    }
)

module.exports = Property