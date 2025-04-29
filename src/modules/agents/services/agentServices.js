const { error } = require('../../../utils/helpers')
const User = require('../../../models/userModel')
const getAll = async () => {
    try{
        const agents = await User.findAndCountAll( { where: { role: 'agent' } });
        if(!agents) error(404, "No agents found")
        
        return agents
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

const get = async (id) => {
    try{
        const agentId = id
        const agent = User.findOne( {where: { id: agentId }} );

        if(!agent) error(404, "Agent not found!")
        
        return agent;
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

module.exports = {
    getAll,
    get
}