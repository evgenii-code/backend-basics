const { Joi } = require('celebrate');

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
    avatar: Joi.string().required(),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.authSchema = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
};

module.exports.findUser = {
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
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
    avatar: Joi.string().required(),
  }),
};

module.exports.createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
};

module.exports.cardIdScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};