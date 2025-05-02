const { error } = require("../../../utils/helpers")
const Plan = require('../../../models/planModel')

const create = async ({ name, maxProperties, duration, price }) => {

    try{
        const newPlan = await Plan.create({ name, maxProperties, duration, price })
        if(!newPlan) error(503, 'Service unavailable')
        
        return newPlan
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error')
    }
}

const getAll = async () => {
    try{
        const plans = await Plan.findAll()
        if(!plans) error(404, 'No Plan Found');

        return plans
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error')
    }
}

const get = async (id) => {
    try{
        const plan = await Plan.findOne({ where: { id }})
        if(!plan) error(404, "Plan not found")
        
        return plan
    }
    catch(err){
        error(err.statusCode || 500, err.message || "Internal server error");
    }
}

module.exports = {
    create,
    getAll,
    get
}