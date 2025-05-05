const Plan = require('../../../models/planModel')
const Subscription = require('../../../models/Subscription')
const { error } = require('../../../utils/helpers')
const getAgentSub = async (agentId) => {
    try{
        const subscriptions = await Subscription.findAll({ 
            where: { agentId },
            include: [{ model: Plan, as: 'plan' }],
        })
    
        if(!subscriptions || subscriptions.length === 0) error(404, 'No subscription found')
        
        return subscriptions
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error')
    }
    
}

module.exports = {
    getAgentSub
}

