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

const router = express.Router();
router.get('/agent-properties',authMiddleware.authenticate, authMiddleware.authorize, getAgentProperties)
router.get('/:id', getSingleProperty);
router.get('/', getAllProperty);
router.post('/', validateRequest(propertyValidator.createropertySchema), authMiddleware.authenticate, authMiddleware.authorize, addProperty);
router.put('/:id', validateRequest(propertyValidator.updatePropertySchema), authMiddleware.authenticate, authMiddleware.authorize, updateSingleProperty);
router.delete('/:id', deleteSingleProperty);

module.exports = router