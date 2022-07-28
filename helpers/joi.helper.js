const Joi = require("joi");

const authorSchema = Joi.object({
  id: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  nombre: Joi.string().min(1).max(10).required(),
  apellido: Joi.string().min(1).max(15).required(),
  edad: Joi.number().integer().required(),
  alias: Joi.string().min(1).max(10).required(),
  avatar: Joi.string().min(1).max(255).required(),
});

const messageTextSchema = Joi.object({
  text: Joi.string().alphanum().min(1).max(200).required(),
});

module.exports = {
  authorSchema,
  messageTextSchema,
};
