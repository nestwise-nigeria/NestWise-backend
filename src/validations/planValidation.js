const Joi = require('joi');
const { update } = require('../modules/payments/controllers/planControllers');

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


const updatePlanSchema = Joi.object({
        name: Joi.string().optional(),
        duration: Joi.number().optional(),
        maxProperties: Joi.number().optional(),
        price: Joi.number().optional(),
})

module.exports = {
    createPlanSchema,
    updatePlanSchema
}