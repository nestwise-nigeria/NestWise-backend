const propertyService = require('../services/propertyServices')
const addProperty = async (req, res) => {
    //accept data from request body
    try{
        const data = req.body
        const property = await propertyService.create(data);

        res.status(201).json({ success: true, data: property });
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }

}

const getAllProperty = async (req, res) => {
    try{
        const properties = await propertyService.getAll();

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

const updateSingleProperty = (req, res) => {
    const id = req.params.id;
}

const deleteSingleProperty = (req, res) => {
    const id = req.params.id;
}

module.exports = {
    addProperty,
    getAllProperty,
    getSingleProperty,
    updateSingleProperty,
    deleteSingleProperty
}