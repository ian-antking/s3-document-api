const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
    .required(),
  document: Joi.any()
    .required(),
});
