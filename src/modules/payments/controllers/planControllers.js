const { error } = require('../../../utils/helpers')
const planServices = require('../services/planServices')
// create plans 
const post = async (req, res) => {
    try{
        const { name, maxProperties, duration, price } = req.body;
        if(!name || !maxProperties || !duration || !price) error(403, 'All credentials are required')
        const newPlan = await planServices.create({ name, maxProperties, duration, price })

        if(!newPlan) error(500, 'Unable to create plan, please try after some time!')
        
        res.status(201).json({ success: true, data: newPlan });
    }
    catch(err){
        res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Internal server error' })
    }
}

const get = (req, res) => {
    try{

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const getAll = async (req, res) => {
    try{

        const plans = await Plan.getAll()
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const update = (req, res) => {
    try{

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const deleteOne = (req, res) => {
    try{

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

module.exports = {
    post,
    get,
    getAll,
    update,
    deleteOne
}

