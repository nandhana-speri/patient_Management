import React, { useState, useRef, useEffect } from 'react';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { loaderTrue } from '../../action';
import { changePasswordAction } from './action';

const schema = Joi.object({
  oldPassword: Joi.string(),

  newPassword: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .message(
      'Invalid password! to be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit. '
    ),
});
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.commonReducer);
  const [formState, setFormState] = useState({
    oldPassword: '',
    newPassword: '',
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
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    console.log(error);
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
    console.log(formState);
    const { error } = schema.validate(formState, { abortEarly: false });
    console.log(error);

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      dispatch(
        changePasswordAction('profile/changepassword', formState, navigate)
      );
      dispatch(loaderTrue());
    }
  };

  return (
    <div className="home-page d-flex">
      <div className="row d-flex justify-content-center align-items-center h-100 w-100 py-5">
        <div className="col-12 col-md-9 col-lg-9 col-xl-9 ">
          <div className="card">
            <div className="card-body p-5">
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div>
                  <h2 className=" text-center">Change Password</h2>
                  <div className="form-group">
                    <label htmlFor="brand">Old Password:</label>
                    <input
                      type="text"
                      name="oldPassword"
                      id="oldPassword"
                      className="form-control"
                      value={formState.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.oldPassword && (
                      <small style={{ color: 'red' }}>
                        {errors.oldPassword}
                      </small>
                    )}
                  </div>
                  <div className=" form-group">
                    <label htmlFor="engineNo">New Password:</label>
                    <input
                      type="text"
                      name="newPassword"
                      id="newPassword"
                      className="form-control"
                      value={formState.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.newPassword && (
                      <small style={{ color: 'red' }}>
                        {errors.newPassword}
                      </small>
                    )}
                  </div>

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
                    <button type="submit" className="submit">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
