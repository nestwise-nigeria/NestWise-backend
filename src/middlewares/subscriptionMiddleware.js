const Plan = require("../models/planModel")
const Subscription = require("../models/Subscription")
const Property = require('../models/propertyModel')
const { error } = require("../utils/helpers")

const isSubscribed = async (req, res, next) => {
    try{
        const agentId = req.user.id
        // check if agent has a valid subscription 
        const subscription = await Subscription.findOne({ 
            where: { agentId, isActive: true },
            include: [{ model: Plan, as: 'plan' }],
        })

        if(!subscription) error(403, 'No active Subscription')

        const now = new Date();
        if(now > subscription.endDate){
            subscription.isActive = false;
            await subscription.save()

            error(403, 'Subscription expired')
        }
         //check for number of properties uploaded

         const numOfProperties = await Property.count({ where: { authorId: agentId }})

         if(numOfProperties >= subscription.plan.maxProperties) error(403, 'Maximum Number of Property reached')
        
        next()
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message })
    }
}

module.exports = {
    isSubscribed
}