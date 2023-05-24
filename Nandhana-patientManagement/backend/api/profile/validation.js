const Joi = require('joi');

exports.signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': `name is required `,
      'any.required': `name is a required field`,
    }),
    phoneNumber: Joi.string()
      .required()
      .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      .messages({
        'string.empty': `phoneNumber is required `,
        'any.required': `phoneNumber is a required`,
        'string.pattern.base': `Invalid phone number format`,
      }),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.empty': `Email is required `,
        'any.required': `Email is a required field`,
      }),
    aadharNumber: Joi.string()
      .required()
      // .regex(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/)
      .messages({
        'string.empty': `aadharNumber is required `,
        'any.required': `aadharNumber is a required`,
        'string.pattern.base': `Invalid aadhar number`,
      }),
    address: Joi.string().required(),
    dob: Joi.string()
      .required()
      // .regex(/^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/)
      .messages({
        'string.empty': `date of birth is required `,
        'any.required': `date of birth is a required`,
        'string.pattern.base': `Invalid date of birth format`,
      }),
    pinCode: Joi.string()
      .required()
      .regex(/^\d{6}$/)
      .messages({
        'string.empty': `pinCode is required `,
        'any.required': `pinCode is a required`,
        'string.pattern.base': `Invalid pinCode format`,
      }),
    country: Joi.string().required(),
    state: Joi.string(),
    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .message(
        'Invalid password! to be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit. '
      ),
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
