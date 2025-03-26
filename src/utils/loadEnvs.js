const axios = require('axios');
require('dotenv').config();
const { ENVS_API_KEY } = process.env

async function loadEnvs() {
  try {
    const response = await axios.get('https://envs.ai/api/v1', {
      params: {
        authorization: ENVS_API_KEY, // Replace with your actual API key
        project: 'Netwise',
        environment: process.env.NODE_ENV || 'development' // Default to 'development' if NODE_ENV isn't set
      }
    });

    // Convert the array of variables to .env format
    const envConfig = response.data.reduce((acc, variable) => {
      acc[variable.key] = variable.value;
      return acc;
    }, {});

    // Set environment variables
    Object.assign(process.env, envConfig);
    console.log('✅ Environment variables loaded successfully');
  } catch (error) {
    console.error('Failed to load environment variables:', error.message);
    process.exit(1); // Exit the application if loading env variables fails
  }
}

module.exports = loadEnvs;
