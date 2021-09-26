const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  document: Joi.object({
    content: Joi.string().base64().required(),
  }),
});
