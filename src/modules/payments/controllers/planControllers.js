const { error } = require('../../../utils/helpers')
const planServices = require('../services/planServices')
// create plans 
const createPlan = async (req, res) => {
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

const getPlan = async (req, res) => {
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

const getAllPlan = async (req, res) => {
    try{

        const plans = await planServices.getAll()
        if(!plans) error(503, 'Service Unavailable')

        res.status(200).json({ success: true, data: plans })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const updatePlan = async (req, res) => {
    try{
        const id = req.params.id
        const { name, maxProperties, price, duration } = req.body
        if(!id) error(400, 'id is required')
        
        const updatedPlan = planServices.update({ id, name, maxProperties, price, duration })
        if(!updatedPlan) error(503, 'Service Unavailable')

        res.status(200).json({ success: true, data: updatedPlan })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

const deletePlan = (req, res) => {
    try{

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }

}

module.exports = {
    createPlan,
    getAllPlan,
    getPlan,
    updatePlan,
    deletePlan
}

