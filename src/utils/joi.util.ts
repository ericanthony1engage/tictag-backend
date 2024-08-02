import * as Joi from 'joi';

// Create a default schema configuration with abortEarly: false
const joi: Joi.Root = Joi.defaults((schema) =>
  schema.options({ abortEarly: false }),
);

export default joi;
