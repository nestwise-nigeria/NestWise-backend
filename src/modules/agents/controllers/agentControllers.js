const agentServices = require('../services/agentServices')
const getAllAgents = async (req, res) => {
    try{
        const agents = await agentServices.getAll();
        res.status(200).json({ success: true, data: agents });
    }

    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

const getAgent = async (req, res) => {
    try{
        const id = req.params.id;
        const agent = await agentServices.get(id);
        res.status(200).json({ success: true, message: agent })
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message})
    }
}

module.exports = {
    getAllAgents,
    getAgent
}