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

module.exports = {
    create
}