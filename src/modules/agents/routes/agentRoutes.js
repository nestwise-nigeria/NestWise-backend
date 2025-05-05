const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const authMiddleware = require('../../../middlewares/authMiddleware')
const agentController = require('../controllers/agentControllers');
const { getAgentSubscription } = require('../../payments/controllers/subscriptionControllers');


const router = express.Router();
router.get('/', agentController.getAllAgents)
router.get('/subscriptions', authMiddleware.authenticate, authMiddleware.authorize, getAgentSubscription)
router.get('/:id', agentController.getAgent)


module.exports = router