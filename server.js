const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./router');
const dbConnection = require('./src/database/db')

const PORT = process.env.PORT || 3000;


const app = express();

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//connect allapi routes
app.use('/api', router);

// Test database connection
dbConnection
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

// synchronize models
dbConnection
  .sync({ alter: true })
  .then(() => console.log('Models synchronized'))
  .catch((err) => console.error('Model synchronization failed:', err));

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT} `);
})
