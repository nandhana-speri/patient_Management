import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import './index.css';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { diseaseListGetAction, diseasePostAction } from './action';
import { loaderTrue } from '../../action';

function DiseaseFile(props) {
  const navigate = useNavigate();
  const { loader,role } = useSelector((state) => state.commonReducer);
  const { diseaseList } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    diseaseName: '',
    startDate: '',
    remarks: '',
  });

  useEffect(() => {
    if(role==='patient'){
    dispatch(diseaseListGetAction());
    }
  }, []);

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
      dispatch(diseasePostAction(formState));

      dispatch(loaderTrue());
      props.onHide();

      setFormState({ diseaseName: '', startDate: '', remarks: '' });
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Disease Add
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div class="grids">
              <div class="form-group a">
                <label for="diseaseName">Disease Name</label>
                <select
                  name="diseaseName"
                  id="cars"
                  value={formState.diseaseName}
                  onChange={(e) =>
                    setFormState({ ...formState, diseaseName: e.target.value })
                  }
                >
                  <option value="volvo">select one</option>
                  {diseaseList?.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </select>
                {errors.diseaseName && (
                  <small style={{ color: 'red' }}>{errors.diseaseName}</small>
                )}
              </div>

              <div class="form-group b">
                <label for="startDate">start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={formState.startDate}
                  name="startDate"
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) =>
                    setFormState({ ...formState, startDate: e.target.value })
                  }
                />
                {errors.startDate && (
                  <small style={{ color: 'red' }}>{errors.startDate}</small>
                )}
              </div>

              <div class="form-group email-group">
                <label for="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  type="text"
                  value={formState.remarks}
                  name="remarks"
                  onChange={(e) =>
                    setFormState({ ...formState, remarks: e.target.value })
                  }
                />
                {errors.remarks && (
                  <small style={{ color: 'red' }}>{errors.remarks}</small>
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
                      diseaseName: '',
                      startDate: '',
                      remarks: '',
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
    </div>
  );
}

export default DiseaseFile;
