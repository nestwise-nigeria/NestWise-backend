const express = require('express')

const router = express.Router()
const authroute = require('./src/modules/auth/routes/authRoutes')
const propertyRoute = require('./src/modules/properties/routes/propertyRoutes')

router.get('/', () => {
    console.log('api route reached')
});

router.use('/auth', authroute)
router.use('/property', propertyRoute);


module.exports = router