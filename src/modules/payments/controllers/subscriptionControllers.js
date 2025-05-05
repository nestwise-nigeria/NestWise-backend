const { error } = require('../../../utils/helpers')
const subscriptionServices = require('../services/subscriptionServices')
const getAgentSubscription = async (req, res) => {
    try{
        const agentId = req.user.id

        if(!agentId) error(404, 'AgentID not found')

        const subscriptions = await subscriptionServices.getAgentSub(agentId);

        if(!subscriptions) error('503', 'Service Unavailable')

        res.status(200).json({ success: true, data: subscriptions });

    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

module.exports = {
    getAgentSubscription
}