const { Joi } = require('celebrate');
const { urlValidation } = require('./url-validation');

module.exports.loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.createUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlValidation, 'custom url validation'),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.authSchema = {
  // headers: Joi.object().keys({
  //   authorization: Joi.string().required(),
  // }).unknown(true),

  // no validation for cookies
};

module.exports.findUser = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
};

module.exports.editUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.editAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation, 'custom url validation'),
  }),
};

module.exports.createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidation, 'custom url validation'),
  }),
};

module.exports.cardIdScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};
