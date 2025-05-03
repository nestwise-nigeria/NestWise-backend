const { Op } = require("sequelize");
const { error } = require('../../../utils/helpers')
const User = require('../../../models/userModel')
const Property = require('../../../models/propertyModel')
const getAll = async ({ name, page = 1, perPage = 10, }) => {
    try{
        const where = {}
        if(name) where.firstname = { [Op.iLike]: `%${name}%` };
        const sortOption = [
            ['createdAt', 'DESC']
          ];
          where.role = 'agent';

          // Pagination
        const limit = parseInt(perPage, 10);
        const offset = (parseInt(page, 10) - 1) * limit;
        const agents = await User.findAndCountAll({
            where,
            order: sortOption,
            limit,
            offset
        });
        if(!agents) error(404, "No agents found")

        //hide agents sensitive data
        const returnedAgents = agents.rows.map(agent => ({
            id: agent.id,
            firstname: agent.firstname,
            lastname: agent.lastname,
            email: agent.email,
            phone: agent.phone,
            picture: agent.profilePicture
        }));

        return {
            count: agents.count,
            agents: returnedAgents
        };
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

const get = async (id) => {
    try{
        const agentId = id
        const agent = await User.findOne( 
            {
                where: { id: agentId },
                attributes: ["id", "firstname", "lastname", "email", "phone", "profilePicture"],

            include: [
                {
                    model: Property,
                    as: "properties",
                }
            ]
        } );

        if(!agent) error(404, "Agent not found!")

            
        return agent
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

module.exports = {
    getAll,
    get
}