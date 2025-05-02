const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const { createPlanSchema } = require('../../../validations/planValidation')
const planControllers = require('../controllers/planControllers')


const router = express.Router()

router.post('/', validateRequest(createPlanSchema), planControllers.post)

module.exports = router