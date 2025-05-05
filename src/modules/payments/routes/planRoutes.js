const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const { createPlanSchema, updatePlanSchema } = require('../../../validations/planValidation')
const planControllers = require('../controllers/planControllers')


const router = express.Router()

router.post('/', validateRequest(createPlanSchema), planControllers.createPlan)
router.get('/', planControllers.getAllPlan)
router.get('/:id', planControllers.getPlan)
router.put('/:id', validateRequest(updatePlanSchema), planControllers.updatePlan)
router.delete('/:id', planControllers.deletePlan)

module.exports = router