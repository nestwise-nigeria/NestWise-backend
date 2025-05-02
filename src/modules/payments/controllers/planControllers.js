const { error } = require('../../../utils/helpers')
const planServices = require('../services/planServices')
// create plans 
const post = async (req, res) => {
    try{
        const { name, maxProperties, duration, price } = req.body;
        if(!name || !maxProperties || !duration || !price) error(403, 'All credentials are required')
        const newPlan = await planServices.create({ name, maxProperties, duration, price })

        if(!newPlan) error(503, 'Service Unavailable')
        
        res.status(201).json({ success: true, data: newPlan });
    }
    catch(err){
        res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Internal server error' })
    }
}

const get = async (req, res) => {
    try{
        const id = req.params.id
        if(!id) error(400, 'id is required')

        const plan = await planServices.get(id)
        if(!plan) error(503, 'Service Unavailable')

        res.status(200).json({ success: true, data: plan })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const getAll = async (req, res) => {
    try{

        const plans = await planServices.getAll()
        if(!plans) error(503, 'Service Unavailable')

        res.status(200).json({ success: true, data: plans })
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

