import './index.css';
import { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { islogin } from './action';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.empty': `Email is required `,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string().required().messages({
      'string.empty': `username is  required `,
      'any.required': `username is a required field`,
    }),
  });
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };
  const validateField = (name, value) => {
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // handle blur funcation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };
  // handle submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(formState, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      dispatch(islogin('auth/login', formState, navigate));

      setFormState({ email: '', password: '' });
    }
  };

  return (
    <section className="login" style={{ border: 'solid black 1px' }}>
      <div className="login_box">
        <div className="left">
          <div className="contact">
            <form onSubmit={handleSubmit}>
              <h3>SIGN IN</h3>
              <input
                type="text"
                className="input"
                name="email"
                id="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <input
                type="password"
                className="input"
                placeholder="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p style={{ color: 'red' }}>{errors.password}</p>
              )}
              <button type="submit" className="submit">
                Submit
              </button>
              <h7 style={{ padding: '0px 100px' }}>
                Don't have an account?
                <a
                  style={{ color: 'blue' }}
                  onClick={() => navigate('/registration')}
                >
                  signup
                </a>{' '}
              </h7>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
