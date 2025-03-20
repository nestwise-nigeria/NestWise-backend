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

module.exports = {
    create,
    getAll
}