const Joi = require('joi');

exports.InformationValidation = async (req, res, next) => {
    const schema = Joi.object({
        blood: Joi.string().required().messages({
          'string.empty': `blood group is required `,
        }),
        height: Joi.string().required().messages({
          'string.empty': `height is required `,
          'any.required': `height is a required`,
        }),
        weight: Joi.string().required().messages({
          'string.empty': `Weight is required `,
          'any.required': `Weight is a required field`,
        }),
        gender: Joi.string().required().messages({
          'string.empty': `gender is required `,
          'any.required': `gender is a required`,
        }),
      });
    

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log('VALIDATION ERROR', err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
