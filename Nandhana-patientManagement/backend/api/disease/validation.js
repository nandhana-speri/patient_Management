const Joi = require('joi');

exports.diseaseValidation = async (req, res, next) => {
  const schema = Joi.object({
    diseaseName: Joi.string().required().messages({
      'string.empty': `choose one `,
    }),
    startDate: Joi.string().required().messages({
      'string.empty': `date is required `,
      'any.required': `date is a required`,
    }),
    remarks: Joi.string().required().messages({
      'string.empty': `remarks is required `,
      'any.required': `remarks is a required field`,
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
