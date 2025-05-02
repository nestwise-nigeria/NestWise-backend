const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const authMiddleware = require('../../../middlewares/authMiddleware')
const agentController = require('../controllers/agentControllers')


const router = express.Router();
// router.get('/agent-properties', authMiddleware.authenticate, authMiddleware.authorize, getAgentProperties)
router.get('/', agentController.getAllAgents)
router.get('/:id', agentController.getAgent)

module.exports = router