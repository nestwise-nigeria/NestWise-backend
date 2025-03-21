const Joi = require('joi')

const propertySchema = Joi.object({
    title: Joi.string()
            .min(5)
            .required()
            .messages({
      "any.required": "Property title is required",
    }),
    description: Joi.string()
            .min(15)
            .required()
            .messages({
      "any.required": "Property description is required",
    }),
    price: Joi.string()
            .required()
            .messages({
      "any.required": "Price is required",
    }),
    address: Joi.string()
            .required()
            .messages({
      "any.required": "Address is required",
    }),
    city: Joi.string()
            .required()
            .messages({
      "any.required": "City is required",
    }),
    state: Joi.string()
            .required()
            .messages({
      "any.required": "State is required",
    }),
    bathroom: Joi.number()
            .integer()
            .messages({
      "any.required": "Bathroom must be a number",
    }),
    bedroom: Joi.number()
            .integer()
            .messages({
      "any.required": "Number of bedroom must be a number",
    }),
    squareFeet: Joi.number()
            .integer()
            .messages({
      "any.required": "square feet must be a number",
    }),
    propertyType: Joi.string()
            .required()
            .messages({
      "any.required": "Property type is required",
    }),
    listingType: Joi.string()
            .required()
            .messages({
      "any.required": "Listing type is required",
    }),

  });
  module.exports = propertySchema;