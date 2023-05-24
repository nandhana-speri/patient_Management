import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Joi from 'joi';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { loaderTrue, setProfile } from '../../action';
import { profileEditAction } from './action';

// validation schema
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
});

const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.commonReducer);
  const [formState, setFormState] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    aadharNumber: '',
    dob: '',
    address: '',
    pinCode: '',
    country: '',
    state: '',
  });
  useEffect(() => {
    if (props.data) {
      setFormState({
        name: props.data.name || '',
        phoneNumber: props.data.phoneNumber || '',
        email: props.data?.login?.email || '',
        aadharNumber: props.data.aadharNumber || '',
        dob: props.data.dob || '',
        address: props.data.address || '',
        pinCode: props.data.pinCode || '',
        country: props.data.country || '',
        state: props.data.state || '',
      });
    }
  }, [props.data, props.show]);

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

  // handleBlur function
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

  // handleSubmit function
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
      dispatch(profileEditAction(formState));
      dispatch(loaderTrue());
      props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Health Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="containers">
          <header className="headers">Registration</header>
          <form onSubmit={handleSubmit}>
            <div className="form first">
              <div className="details personal">
                <span className="titles">Personal Details</span>

                <div className="fields">
                  <div className="input-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && (
                      <small style={{ color: 'red' }}>{errors.name}</small>
                    )}
                  </div>

                  <div className="input-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="phone Number"
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && (
                      <small style={{ color: 'red' }}>
                        {errors.phoneNumber}
                      </small>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Aadhar Number</label>
                    <input
                      type="text"
                      placeholder="aadhar Number"
                      name="aadharNumber"
                      value={formState.aadharNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.aadharNumber && (
                      <small style={{ color: 'red' }}>
                        {errors.aadharNumber}
                      </small>
                    )}
                  </div>

                  <div className="input-field">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && (
                      <small style={{ color: 'red' }}>{errors.email}</small>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Date of birth</label>
                    <input
                      type="date"
                      placeholder="Enter your dob"
                      name="dob"
                      value={formState.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.dob && (
                      <small style={{ color: 'red' }}>{errors.dob}</small>
                    )}
                  </div>

                  <div className="input-field">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && (
                      <small style={{ color: 'red' }}>{errors.address}</small>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Pin Code</label>
                    <input
                      type="text"
                      placeholder="Enter your pinCode"
                      name="pinCode"
                      value={formState.pinCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.pinCode && (
                      <small style={{ color: 'red' }}>{errors.pinCode}</small>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      name="country"
                      value={formState.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.country && (
                      <small style={{ color: 'red' }}>{errors.country}</small>
                    )}
                  </div>
                  <div className="input-field">
                    <label>State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      name="state"
                      value={formState.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.state && (
                      <small style={{ color: 'red' }}>{errors.state}</small>
                    )}
                  </div>
                  <button
                    type="button"
                    className="button"
                    style={{ marginRight: '50px' }}
                    onClick={() => {
                      props.onHide();
                      setErrors({});
                      setFormState({
                        name: '',
                        phoneNumber: '',
                        email: '',
                        aadharNumber: '',
                        dob: '',
                        address: '',
                        pinCode: '',
                        country: '',
                        state: '',
                      });
                    }}
                  >
                    Close
                  </button>

                  {loader ? (
                    <TailSpin
                      className="spin-loader"
                      height="60"
                      width="60"
                      color="#184CD9"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      // wrapperStyle={}
                      wrapperClass="spin-loader"
                      visible={true}
                    />
                  ) : (
                    <button className="nextBtn">
                      <span className="btnText">submit</span>
                      <i className="uil uil-navigator"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ProfileEdit;
