import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  phone: Joi.string().max(20).allow('', null),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean(),
});
