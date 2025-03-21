const Property = require('../models/propertyModel');
const { error } = require('../../../utils/helpers');
const create = async (data) => {
    try{
        const newProperty = await Property.create(
            {
                title: data.title,
                description:data.description,
                price: data.price,
                address: data.address,
                city: data.city,
                state: data.state,
                property_type: data.propertyType.toLowerCase(),
                listing_type: data.listingType,
                bedroom: data.bedroom || null,
                bathroom: data.bathroom || null,
                square_feet: data.squareFeet || null,
        }
        );

        return (newProperty);
    }
    catch(err){
        error(500, err.message);
    }
    

}

const getAll = async () => {
    try{
        const properties = Property.findAll({});
        return (properties);
    }
    catch(err){
        error(500, err.message);
    }
    
}

const getOne = async (id) => {
    try{
        const property = await Property.findOne({ where: { id }});

        if(!property || property === null)error(404, 'Property Not Found!');

        return property;
    }
    catch(err){
        error(err.statusCode || 500, err.message);
    }
}

const updateOne = async ({id, title, description, propertyType,
                        price, status, listingType, bathroom, bedroom,
                        squareFeet, address, city, state }) => {
        try{
            const query = {};
            if(title) query.title = title;
            if(description) query.description = description;
            if(propertyType) query.property_type = propertyType;
            if(price) query.price = price;
            if(status) query.status = status;
            if(listingType) query.listing_type = listingType;
            if(bathroom) query.bathroom = bathroom;
            if(bedroom) query.bedroom = bedroom;
            if(squareFeet) query.square_feet = squareFeet;
            if(address) query.address = address;
            if(city) query.city = city;
            if(state) query.state = state;

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
module.exports = {
    create,
    getAll,
    getOne,
    updateOne
}