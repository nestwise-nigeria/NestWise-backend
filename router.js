const express = require('express')

const router = express.Router()
const propertyRoute = require('./src/modules/properties/routes/propertyRoutes')

router.get('/', () => {
    console.log('api route reached')
});

router.use('/property', propertyRoute);


module.exports = router