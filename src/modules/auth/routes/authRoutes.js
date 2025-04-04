const express = require('express')
const authControllers = require('../controllers/authControllers')
const validateRequest = require('../../../middlewares/validateRequest')
const authValidation = require('../../../validations/authValidation')


const router = express.Router()

router.post('/register', validateRequest(authValidation.registerSchema), authControllers.registerUser)
router.post('/login', authControllers.loginUser)

module.exports = router