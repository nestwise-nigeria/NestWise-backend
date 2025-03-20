const express = require('express')
const { addProperty, 
    getAllProperty, 
    getSingleProperty, 
    updateSingleProperty, 
    deleteSingleProperty } = require('../controllers/propertyControllers');

const router = express.Router();

router.get('/:id', getSingleProperty);
router.get('/', getAllProperty);
router.post('/', addProperty);
router.put('/:id', updateSingleProperty);
router.delete('/:id', deleteSingleProperty);

module.exports = router