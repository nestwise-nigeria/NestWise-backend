const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const propertyValidator = require('../../../validations/listingValidation')
const authMiddleware = require('../../../middlewares/authMiddleware')
const { addProperty, 
    getAllProperty, 
    getSingleProperty, 
    updateSingleProperty, 
    deleteSingleProperty,
    getAgentProperties } = require('../controllers/propertyControllers');
const { isSubscribed } = require('../../../middlewares/subscriptionMiddleware')

const router = express.Router();
router.get('/agent-properties',authMiddleware.authenticate, authMiddleware.authorize, getAgentProperties)
router.get('/:id', getSingleProperty);
router.get('/', getAllProperty);
router.post('/', validateRequest(propertyValidator.createPropertySchema), authMiddleware.authenticate, authMiddleware.authorize, isSubscribed, addProperty);
router.put('/:id', validateRequest(propertyValidator.updatePropertySchema), authMiddleware.authenticate, authMiddleware.authorize, updateSingleProperty);
router.delete('/:id',authMiddleware.authenticate, authMiddleware.authorize, deleteSingleProperty);

module.exports = router