const Joi = require('joi')

const createPropertySchema = Joi.object({
    name: Joi.string()
            .min(5)
            .required()
            .messages({
      "any.required": "name is required",
    }),
    description: Joi.string()
            .min(15)
            .required()
            .messages({
      "any.required": "description is required",
    }),
    imageUrls: Joi.array()
            .messages({
      "any.required": "imageUrls should be added as array",
    }),
    address: Joi.string()
            .required()
            .messages({
      "any.required": "address is required",
    }),
    bathrooms: Joi.number()
            .integer()
            .messages({
      "any.required": "bathrooms is required",
    }),
    bedrooms: Joi.number()
            .integer()
            .required()
            .messages({
      "any.required": "bedrooms is required",
    }),
    
    regularPrice: Joi.number()
            .required()
            .messages({
      "any.required": "regularPrice is required",
    }),
    discountPrice: Joi.number()
            .messages({
      "any.required": "discountPrice is required",
    }),
    offer: Joi.boolean()
            .required()
            .messages({
      "any.required": "offer is required",
    }),
    parking: Joi.boolean()
            .required()
            .messages({
      "any.required": "parking is required",
    }),
    furnished: Joi.boolean()
            .required()
            .messages({
      "any.required": "furnished is required",
    }),
    isFeatured: Joi.boolean()
            .required()
            .messages({
      "any.required": "isFeatured is required",
    }),
    location: Joi.string()
            .required()
            .messages({
      "any.required": "location is required",
    }),
    type: Joi.string()
              .required()
              .messages({
                "any.required": "type is required"
                }),

  });

//update validator validator
const updatePropertySchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  description: Joi.string().optional(),
  imageUrls: Joi.array().optional(),
  address: Joi.string().optional(), // Ensure URL is valid
  bathrooms: Joi.number().optional(),
  bedrooms: Joi.number().optional(),
  regularPrice: Joi.number().optional(),
  discountPrice: Joi.number().optional(),
  offer: Joi.boolean().optional(),
  parking: Joi.boolean().optional(),
  furnished: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  location: Joi.string().optional(),
  type: Joi.string().optional()
});


  module.exports = {
    createPropertySchema,
    updatePropertySchema
  }