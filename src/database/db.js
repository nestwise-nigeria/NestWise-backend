//database connection
require('dotenv').config();
const { Sequelize } = require("sequelize");
const { PG_DATABASE, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } = process.env

const dbConnection = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, { 
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  dialectOptions: process.env.NODE_ENV === 'production'
      // disables SSL for local/dev, but enables it for production
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
    logging: false,
}
)

module.exports = dbConnection;