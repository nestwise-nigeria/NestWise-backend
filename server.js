const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./router');

const PORT = process.env.PORT || 3000;


const app = express();

//middlewares
app.use(cors());


app.get('/', () => {
    console.log('welcome to home route');
});
//connect allapi routes
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT} `);
})