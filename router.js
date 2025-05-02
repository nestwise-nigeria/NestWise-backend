const express = require('express')

const router = express.Router()
const authroute = require('./src/modules/auth/routes/authRoutes')
const propertyRoute = require('./src/modules/properties/routes/propertyRoutes')
const postRoute = require('./src/modules/post/routes/postRoutes')

// Home route
// This route will be used to check if the server is running and to get the API version
router.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to netwise API', data: { version: '1.0.0' } })
});

router.use('/auth', authroute)
router.use('/property', propertyRoute);
router.use('/post', postRoute);


module.exports = router