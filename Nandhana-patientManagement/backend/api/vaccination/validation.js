const Joi = require('joi');

exports.vaccinationValidation = async (req, res, next) => {
  const schema = Joi.object({
    vaccine: Joi.string().required().messages({
      'string.empty': `blood group is required `,
    }),
    date: Joi.string().required().messages({
      'any.required': `date is a required`,
    }),
    time: Joi.string().required().messages({
      'string.empty': `time is required `,
      'any.required': `time is a required field`,
    }),
    time: Joi.string().required().messages({
      'string.empty': `time is required `,
      'any.required': `time is a required field`,
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
