const { error } = require('../../../validations/listingValidation');
const propertyService = require('../services/propertyServices')
const addProperty = async (req, res) => {
    //accept data from request body
    try{
        const data = req.body
        data.authorId = req.user.id
        const property = await propertyService.create(data);
        res.status(201).json({ success: true, data: property });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getAllProperty = async (req, res) => {
    try{
        const { name, description, bedrooms, min, max, location, type  } = req.query;
        const properties = await propertyService.getAll({ name, description, bedrooms, min, max, location, type });

        res.status(200).json( { success: true, data: properties });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getSingleProperty = async(req, res) => {
    try{
        const id = req.params.id;
        const property = await propertyService.getOne(id);

        res.status(200).json( { success: true, data: property });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getAgentProperties = async (req, res) => {
    try{
        const userId = req.user.id
        console.log(userId)
        const properties = await propertyService.getAgentProperties({ userId });

        res.status(200).json({ success: true, message: 'properties fetched successfully', data: properties })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message })
    }
}

const updateSingleProperty = async (req, res) => {
    try{
        const id = req.params.id;
        const { name, description, type,
            regularPrice, discountPrice, status, bathrooms, bedrooms, address, location, isFeatured
         } = req.body

         const updatedProperty = await propertyService.updateOne({ id, name, description, type,
                                                                regularPrice, discountPrice, status, bathrooms, bedrooms,
                                                             address, location, isFeatured, offer });
        
        res.status(200).json({ success: true, message: 'property updated successfully', data: updatedProperty });

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const deleteSingleProperty = async (req, res) => {
    const id = req.params.id;
    try{
        const deleted = await propertyService.deleteOne(id);

        res.status(200).json({ success: true, messsage: 'Item deleted successfully', data: deleted });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

module.exports = {
    addProperty,
    getAllProperty,
    getSingleProperty,
    getAgentProperties,
    updateSingleProperty,
    deleteSingleProperty
}