const express = require('express')
const validateRequest = require('../../../middlewares/validateRequest')
const propertyValidator = require('../../../validations/listingValidation')
const authMiddleware = require('../../../middlewares/authMiddleware')
const { addProperty, 
    getAllProperty, 
    getSingleProperty, 
    updateSingleProperty, 
    deleteSingleProperty } = require('../controllers/propertyControllers');

const router = express.Router();

router.get('/:id', getSingleProperty);
router.get('/', getAllProperty);
router.post('/', validateRequest(propertyValidator), authMiddleware.authenticate, addProperty);
router.put('/:id', updateSingleProperty);
router.delete('/:id', deleteSingleProperty);

module.exports = router