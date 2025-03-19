const express = require('express')

const router = express.Router()

router.get('/', () => {
    console.log('api route reached')
});

module.exports = router