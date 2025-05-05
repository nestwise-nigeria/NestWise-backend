const Joi = require('joi')

const createPostSchema = Joi.object({
    title: Joi.string()
            .min(5)
            .required()
            .messages({
      "any.required": "title is required",
    }),
    body: Joi.string()
            .min(15)
            .required()
            .messages({
      "any.required": "post is required",
    }),
 });

//update validator validator
const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  body: Joi.string().optional(),
});


  module.exports = {
    createPostSchema,
    updatePostSchema
  }