const Joi = require('joi')

const createPlanSchema = Joi.object({
    name: Joi.string()
            .required()
            .messages({
      "any.required": "name is required",
    }),
    maxProperties: Joi.number()
            .required()
            .messages({
      "any.required": "maxProperties is required",
    }),
    duration: Joi.number()
            .required()
            .messages({
      "any.required": "duration is required",
    }),
    price: Joi.number()
            .required()
            .messages({
      "any.required": "price is required",
    }),

  });

module.exports = {
    createPlanSchema
}