const loadEnvs = require('./src/utils/loadEnvs');  // Import the environment loader function

async function startApp() {
  await loadEnvs() // Wait for env variables to load from envs.ai
  const {JWT_ALGORITHM, JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, ACCESS_TOKEN_EXPIRE_HOURS
  } = process.env

  console.log('JWT Algorithm is:', JWT_ALGORITHM)

  const express = require('express');
  const cors = require('cors');
  require('dotenv').config();
  const router = require('./router');
  const dbConnection = require('./src/database/db')

  const PORT = process.env.PORT || 3000;


  const app = express();

  //middlewares
  app.use(cors());
  app.use(express.json());


  app.get('/', () => {
      console.log('welcome to home route');
  });
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
}

startApp();