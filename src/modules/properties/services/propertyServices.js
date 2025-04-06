const { Op } = require("sequelize");
const Property = require('../../../models/propertyModel')
const User = require('../../../models/userModel')
const { error } = require('../../../utils/helpers');
const create = async (data) => {
    try{
        const newProperty = await Property.create(
            {
                name: data.name,
                imageUrls: data.imageUrls,
                description:data.description,
                regularPrice: data.regularPrice,
                discountPrice: data.discountPrice,
                address: data.address,
                type: data.type,
                bedrooms: data.bedrooms || null,
                bathrooms: data.bathrooms || null,
                status: data.status,
                location: data.location,
                offer: data.offer,
                isFeatured: data.isFeatured,
                authorId: data.authorId
        }
        );

        return (newProperty);
    }
    catch(err){
        error(500, err.message);
    }
    

}

const getAll = async ({ name, description, location, bedrooms, min, max, type, page = 1,
    perPage = 10, }) => {
    try{
        const where = {}
        if(name) where.name = name;
        if(description) where.description = { [Op.iLike]: `%${description}%` };
        if(location) where.location = { [Op.iLike]: `%${location}%` };
        if(bedrooms) where.bedrooms = bedrooms;
        if (min && max) {
            where.regularPrice = { [Op.between]: [min, max] };
          } else if (min) {
            where.regularPrice = { [Op.gte]: min };
          } else if (max) {
            where.regularPrice = { [Op.lte]: max };
          };
        if(type) where.type = type;

    const sortOption = [
            ['isFeatured', 'DESC'],  // Featured properties come first
            ['createdAt', 'DESC']     // Then sort by newest first
          ];

          // Pagination
    const limit = parseInt(perPage, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

        const properties = await Property.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "firstname", "lastname", "email", "phone"]
                }
            ],
            order: sortOption,
            limit,
            offset,
        });

        if (!properties.rows.length) {
            // throw new Error("No properties found!");
            error(404, 'No prperty found');
          }
      
          const response =  {
            total: properties.count,
            page: parseInt(page, 10),
            perPage: limit,
            totalPages: Math.ceil(properties.count / limit),
            properties: properties.rows,
          };


        return (response);
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal server error');
    }
}

const getOne = async (id) => {
    try{
        const property = await Property.findOne(
            { 
                where: { id },
                include: [
                    {
                        model: User,
                        as: "author",
                        attributes: ["id", "firstname", "lastname", "email", "phone"]
                    }
                ],
        }
        );

        if(!property || property === null)error(404, 'Property Not Found!');

        return property;
    }
    catch(err){
        error(err.statusCode || 500, err.message);
    }
}

//get Agents/agency/landlord's properties
// const getAgentProperties = async ({ userId, name, description, location, bedrooms, min, max, type, page = 1,
//     perPage = 10, }) => {
//     try{
//         const where = {}
//         if(name) where.name = name;
//         if(description) where.description = { [Op.iLike]: `%${description}%` };
//         if(location) where.location = { [Op.iLike]: `%${location}%` };
//         if(bedrooms) where.bedrooms = bedrooms;
//         if (min && max) {
//             where.regularPrice = { [Op.between]: [min, max] };
//           } else if (min) {
//             where.regularPrice = { [Op.gte]: min };
//           } else if (max) {
//             where.regularPrice = { [Op.lte]: max };
//           };
//         if(type) where.type = type;
//         if(userId) where.userId = userId;

//     const sortOption = [
//             ['isFeatured', 'DESC'],  // Featured properties come first
//             ['createdAt', 'DESC']     // Then sort by newest first
//           ];

//           // Pagination
//     const limit = parseInt(perPage, 10);
//     const offset = (parseInt(page, 10) - 1) * limit;

//         const properties = await Property.findAndCountAll({
//             where,
//             order: sortOption,
//             limit,
//             offset,
//         });

//         if (!properties.rows.length) {
//             error(404, 'No prperty found');
//           }
      
//           const response =  {
//             total: properties.count,
//             page: parseInt(page, 10),
//             perPage: limit,
//             totalPages: Math.ceil(properties.count / limit),
//             properties: properties.rows,
//           };


//         return (response);
//     }
//     catch(err){
//         error(err.statusCode || 500, err.message || 'Internal server error');
//     }
// }

const updateOne = async ({id, name, description, type,
                        regularPrice, discountPrice, status, bathrooms, bedrooms,
                        address, location, isFeatured, offer }) => {
        try{
            const query = {};
            if(title) query.name = name;
            if(description) query.description = description;
            if(type) query.type = type;
            if(regularPrice) query.price = regularPrice;
            if(discountPrice) query.price = discountPrice;
            if(status) query.status = status;
            if(bathrooms) query.bathroom = bathrooms;
            if(bedrooms) query.bedroom = bedrooms;
            if(squareFeet) query.square_feet = squareFeet;
            if(address) query.address = address;
            if(location) query.location = location;
            if(isFeatured) query.isFeatured = isFeatured;
            if(offer) query.offer = offer

            query.updatedAt = new Date();

            const property = await Property.findOne({ where: { id }});

            if(!property || property === null)error(404, 'Property Not Found!');

            const updatedProperty = await Property.update(query, {
                where: { id },
                returning: true, // Only works in PostgreSQL
              });

              return updatedProperty
        }
        catch(err){
            error(err.statusCode || 500, err.message || "Internal server error");
        }
}

const deleteOne = async (id) => {
    try{
         //check if item is in the database
        const property = await Property.findOne({ where: { id }});

        if(!property || property === null)error(404, 'Property Not Found!');

        const deletedData = await Property.destroy({ where: { id}});

        if(!deletedData)error(500, 'Internal Server Error');
    }
    catch(err){
        error(err.statusCode || 500, err.message || 'Internal Server Error!');
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
}