import React, { useState } from 'react';
import { contactPost } from '../../action';
import './index.css';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { loaderTrue } from '../../action';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.commonReducer);
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.empty': `Email is required `,
        'any.required': `Email is a required field`,
      }),
    name: Joi.string().required().min(2).max(10).messages({
      'string.empty': `username is  required `,
      'any.required': `username is a required field`,
    }),
    phoneNumber: Joi.string()
      .required()
      .min(2)
      .max(30)
      .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      .messages({
        'string.empty': `phoneNumber is required `,
        'any.required': `phoneNumber is a required field`,
        'string.pattern.base': `Invalid phone number format`,
      }),
    message: Joi.string().required(),
  });
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(formState, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
        console.log(validationErrors);
      });
      setErrors(validationErrors);
    } else {
      dispatch(contactPost('/contact/post', formState, navigate));
      dispatch(loaderTrue());
      setFormState({
        email: '',
        name: '',
        phoneNumber: '',
        message: '',
      });
    }
  };
  return (
    <div class="container" id="section5">
      <h2 style={{ textAlign: 'center', padding: '15px' }}>ContactUs</h2>

      <div class="bg-light">
        <div class="row" style={{ border: 'solid black 1px' }}>
          <div class="col-lg-8 col-md-12 p-5 bg-white rounded-3">
            <form class="row mb-3" onSubmit={handleSubmit}>
              <div class="col-md-6 p-3">
                <input
                  type="text"
                  name="name"
                  class="fname"
                  value={formState.name}
                  placeholder="First Name"
                  onChange={handleChange}
                />
                {errors.name && (
                  <small style={{ color: 'red' }}>{errors.name}</small>
                )}
              </div>
              <div class="col-md-6 p-3">
                <input
                  type="email"
                  name="email"
                  class="email"
                  value={formState.email}
                  placeholder="Mail"
                  onChange={handleChange}
                />
                {errors.email && (
                  <small style={{ color: 'red' }}>{errors.email}</small>
                )}
              </div>
              <div class="col-md-6 p-3">
                <input
                  type="text"
                  name="phoneNumber"
                  class="phone"
                  value={formState.phoneNumber}
                  placeholder="Phone"
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <small style={{ color: 'red' }}>{errors.phoneNumber}</small>
                )}
              </div>

              <div class="col-md">
                <textarea
                  name="message"
                  id=""
                  value={formState.message}
                  placeholder="Write your message"
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <small style={{ color: 'red' }}>{errors.message}</small>
                )}
              </div>
              <div class="text-end mt-4">
                {loader ? (
                  <TailSpin
                    className="spin-loader"
                    height="60"
                    width="60"
                    color="#184CD9"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperClass="spin-loader"
                    visible={true}
                  />
                ) : (
                  <input class="btn px-4 py-3 btn-outline-dark" type="submit" />
                )}
              </div>
            </form>
          </div>
          <div class="col-lg-4 col-md-12 text-white aside px-4 py-5">
            <div class="mb-5">
              <h1 class="h3">Contact Information</h1>
              <p class="opacity-50">
                <small>
                  Fill out the from and we will get back to you whitin 24 hours
                </small>
              </p>
            </div>
            <div class="d-flex flex-column px-0">
              <ul class="m-0 p-0">
                <li class="d-flex justify-content-start align-items-center mb-4">
                  <span class="opacity-50 d-flex align-items-center me-3 fs-2">
                    <ion-icon name="call"></ion-icon>
                  </span>
                  <span>+134 1234 1234</span>
                </li>
                <li class="d-flex align-items-center r mb-4">
                  <span class="opacity-50 d-flex align-items-center me-3 fs-2">
                    <ion-icon name="mail"></ion-icon>
                  </span>
                  <span>medwin@contact.com</span>
                </li>
                <li class="d-flex justify-content-start align-items-center mb-4">
                  <span class="opacity-50 d-flex align-items-center me-3 fs-2">
                    <ion-icon name="pin"></ion-icon>
                  </span>
                  <span>
                    52 Buddy Ln Conway, <br />
                    Arkansas(AR), 72032
                  </span>
                </li>
              </ul>
              <div class="text-muted text-center">
                <code>
                  Inspiration from :
                  <a href="https://dribbble.com/shots/14126196-Contact-Form-01/attachments/5749555?mode=media">
                    Erşad Başbağ
                  </a>
                </code>
                <br />
                <code>Created By : walid cherhane </code> <br />
                <code>
                  <a
                    class="fs-3"
                    href="https://codepen.io/walidcherhane"
                    target="_blank"
                  >
                    <ion-icon name="logo-codepen"></ion-icon>
                  </a>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
