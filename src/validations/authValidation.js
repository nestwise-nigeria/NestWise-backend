const Joi = require('joi').extend(require('joi-phone-number'));

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required().messages({
    "string.min": "firstname cannot be less than 5 characters",
    "string.max": "firstname cannot be more than 30 characters",
    "any.required": "firstname is required",
  }),
  lastname: Joi.string().min(3).max(30).required().messages({
    "string.min": "lastname cannot be less than 3 characters",
    "string.max": "lastname cannot be more than 30 characters",
    "any.required": "lastname is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "email is required",
    }),
  role: Joi.string().required().messages({
    "any.required": "role is required",
  }),
  phone: Joi.string()
    .phoneNumber({ defaultCountry: "NG", format: "e164" })
    .required()
    .messages({
      "any.required": "phone is required", // e.g. +2347012345678
    }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "password must be at least 6 characters",
    "string.max": "password cannot exceed 30 characters",
    "any.required": "password is required",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password")) // Must match the password field
    .required()
    .messages({
      "any.only": "passwords do not match",
      "any.required": "Confirm password is required",
    }),

    //extended for agents
    // nationality, dob, idType, idNumber, idPicture
    nationality: Joi.string().optional(),
    dob: Joi.date().optional(),
    idType: Joi.string().valid('NIN', 'PVC', 'passport').optional(),
    idNumber: Joi.string().optional(),
    idPicture: Joi.string().optional(),

    
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "email is required",
    }),

  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "password must be at least 6 characters",
    "string.max": "password cannot exceed 30 characters",
    "any.required": "password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
