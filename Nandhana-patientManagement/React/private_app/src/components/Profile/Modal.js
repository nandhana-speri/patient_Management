import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import Button from 'react-bootstrap/Button';
import './index.css';
import { loaderTrue } from '../../action';
import { healthInformationAction } from './action';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { getHealthInformation, healthInformationEditAction } from './action';

function ProfileModal(props) {
  const navigate = useNavigate();
  const bloodgroup = ['A+', 'B+', 'A-', 'AB+', 'AB-', 'O+', 'O-'];
  const { loader } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    blood: '',
    height: '',
    weight: '',
    gender: '',
  });
  useEffect(() => {
    if (props.data) {
      setFormState({
        blood: props.data.blood || '',
        height: props.data.height || '',
        weight: props.data.weight || '',
        gender: props.data.gender || '',
      });
    }
  }, [props.data, props.show]);
  console.log(formState);

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
      if (props.mode === 'edit') {
        dispatch(healthInformationEditAction(formState));
      } else {
        dispatch(healthInformationAction(formState));
      }
      dispatch(loaderTrue());
      dispatch(getHealthInformation());
      props.onHide();

      setFormState({ blood: '', height: '', weight: '', gender: '' });
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
        <form onSubmit={handleSubmit}>
          <div class="grids">
            <div class="form-group a">
              <label for="blood">Blood</label>
              <select
                name="blood"
                id="cars"
                value={formState.blood}
                onChange={(e) =>
                  setFormState({ ...formState, blood: e.target.value })
                }
              >
                <option value="volvo">select one</option>
                {bloodgroup.map((e) => {
                  return <option value={e}>{e}</option>;
                })}
              </select>
              {errors.blood && (
                <small style={{ color: 'red' }}>{errors.blood}</small>
              )}
            </div>

            <div class="form-group b">
              <label for="height">Height</label>
              <input
                id="height"
                type="text"
                value={formState.height}
                name="height"
                onChange={(e) =>
                  setFormState({ ...formState, height: e.target.value })
                }
              />
              {errors.height && (
                <small style={{ color: 'red' }}>{errors.height}</small>
              )}
            </div>

            <div class="form-group email-group">
              <label for="weight">Weight</label>
              <input
                id="weight"
                type="text"
                value={formState.weight}
                name="weight"
                onChange={(e) =>
                  setFormState({ ...formState, weight: e.target.value })
                }
              />
              {errors.weight && (
                <small style={{ color: 'red' }}>{errors.weight}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="radio-group">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formState.gender === 'male'}
                  onChange={(e) =>
                    setFormState({ ...formState, gender: e.target.value })
                  }
                />
                <label htmlFor="male">Male</label>
              </div>

              <div className="radio-group">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formState.gender === 'female'}
                  onChange={(e) =>
                    setFormState({ ...formState, gender: e.target.value })
                  }
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="radio-group">
                <input
                  id="other"
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formState.gender === 'other'}
                  onChange={(e) =>
                    setFormState({ ...formState, gender: e.target.value })
                  }
                />
                <label htmlFor="other">Other</label>
              </div>

              {errors.gender && (
                <small style={{ color: 'red' }}>{errors.gender}</small>
              )}
            </div>

            <div class="button-container">
              <button
                type="button"
                className="button"
                style={{ marginRight: '50px' }}
                onClick={() => {
                  props.onHide();
                  setErrors({});
                  setFormState({
                    blood: '',
                    height: '',
                    weight: '',
                    gender: '',
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
                <button type="submit" class="button">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileModal;
