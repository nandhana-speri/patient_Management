const Joi = require('joi');

exports.consultationValidation = async (req, res, next) => {
  const schema = Joi.object({
    department: Joi.string().required().messages({
      'string.empty': `blood group is required `,
    }),
    doctor: Joi.string().required().messages({
      'string.empty': `height is required `,
      'any.required': `height is a required`,
    }),
    hospital: Joi.string().required().messages({
      'string.empty': `Weight is required `,
      'any.required': `Weight is a required field`,
    }),
    date: Joi.string().required().messages({
      'string.empty': `gender is required `,
      'any.required': `gender is a required`,
    }),
    time: Joi.string().required().messages({
      'string.empty': `gender is required `,
      'any.required': `gender is a required`,
    }),
  });

  try {
    req.body = await schema.validateAsync(req.body.formState);
    next();
  } catch (err) {
    console.log('VALIDATION ERROR', err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
