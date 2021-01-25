import Joi from "joi";

const registerUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().default(false),
});

const authUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserProfileSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/, "alphabet and space only")
    .allow(null, ""),
  email: Joi.string().email().allow(null, ""),
  password: Joi.string().allow(null, ""),
});

const updateUserSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/, "alphabet and space only")
    .allow(null, ""),
  email: Joi.string().email().allow(null, ""),
  isAdmin: Joi.boolean().allow(null),
});

export {
  registerUserSchema,
  authUserSchema,
  updateUserProfileSchema,
  updateUserSchema,
};
