import Joi from "joi";

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .pattern(/^05\d([-]{0,1})\d{7}$/)
    .message("Phone must be a valid Israeli phone number")
    .required(),
  email: Joi.string()
    .min(5)
    .email({ tlds: { allow: false } })
    .message("Email must be a valid email address")
    .required(),
  web: Joi.string()
    .min(14)
    .uri({ scheme: ["http", "https"] })
    .message("Web must be a valid URL")
    .allow(""),
  image: Joi.object({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .message("Image url must be a valid URL")
      .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }).required(),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number(),
  }).required(),
});

export default createCardSchema;
