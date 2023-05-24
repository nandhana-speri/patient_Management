import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import {
  consultationData,
  getDepartment,
  getDoctor,
  getDoctorByDate,
  getHospital,
} from './action';
import Web3 from 'web3';
import moment from 'moment';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../action';

const Consultation = () => {
  const [formState, setFormState] = useState({
    department: '',
    doctor: '',
    hospital: '',
    date: '',
    time: '',
  });

  const navigate = useNavigate();
  const { departmentData, hospitalData, doctorsData, doctorsDataByDate } =
    useSelector((state) => state.consultationReducer);
  const [errors, setErrors] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const { loader } = useSelector((state) => state.commonReducer);
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
  const dispatch = useDispatch();

  const generateTimeSlots = (date) => {
    const currentTime = moment();
    const eveningTime = moment()
      .endOf('day')
      .set({ hour: 17, minute: 0, second: 0 });
    const timeSlots = [];

    const selectedDate = moment(date);
    const isToday = selectedDate.isSame(currentTime, 'day');

    if (isToday) {
      currentTime.startOf('hour').add(1, 'hour'); // Start from the next hour
    } else {
      currentTime.set({ hour: 10, minute: 0, second: 0 });
    }

    while (currentTime.isBefore(eveningTime)) {
      const formattedTime = currentTime.format('hh:mmA');
      if (formattedTime !== '01:00PM') {
        timeSlots.push(formattedTime);
      }
      currentTime.add(1, 'hour').startOf('hour');
    }

    setAvailableTimeSlots(timeSlots);
    return timeSlots;
  };

  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getHospital());
    generateTimeSlots();
  }, []);

  useEffect(() => {
    if (formState.date && formState.doctor) {
      dispatch(getDoctorByDate(formState.date, formState.doctor));
    }
    generateTimeSlots(formState.date);
  }, [formState.date, formState.doctor]);

  useEffect(() => {
    if (doctorsDataByDate?.length > 0) {
      const filteredTimeSlots = availableTimeSlots.filter(
        (slot) => !doctorsDataByDate.some((doctor) => doctor.time === slot)
      );

      setAvailableTimeSlots(filteredTimeSlots);
    }
  }, [doctorsDataByDate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department' || name === 'hospital') {
      const departmentId = name === 'department' ? value : formState.department;
      const hospitalId = name === 'hospital' ? value : formState.hospital;

      dispatch(getDoctor(departmentId, hospitalId));
    }
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
  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formState, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      try {
        dispatch(loaderTrue());
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const netVer = await web3.eth.net.getId();
        const tokenAddress = '0x44B8363ED6e1424Fe8346F5c77883D69d8619f03';

        const toWei = async (web3, amount, decimals) => {
          return await web3.utils.toWei(
            parseFloat(amount).toFixed(decimals).toString(),
            'ether'
          );
        };

        const getGasPrice = async (web3) => {
          const gasPrice = await web3.eth.getGasPrice();
          return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
        };

        const AmountInWei = await toWei(web3, 0.001, 18);
        console.log('AmountInWei', AmountInWei);
        const GetGasPricesss = await getGasPrice(web3);
        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: tokenAddress,
          value: AmountInWei,
          GetGasPricesss,
        });
        console.log('result', result);
        if (result) {
          console.log();
          dispatch(consultationData({ formState, result }, navigate));
        } else {
          console.log('error');
        }
      } catch (e) {
        dispatch(loaderFalse());
        dispatch(setErrorMessage(`${e.message}`));
      }
    }
  };
  return (
    <div>
      <div class="containers" style={{ margin: '100px' }}>
        <h1 class="title">Consultation</h1>
        <form onSubmit={handleSubmit}>
          <div class="grid">
            <div class="form-group b">
              <label for="department">Department</label>
              <select
                name="department"
                id="department"
                className="form-control"
                value={formState.department}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select one</option>
                {departmentData?.map((e, index) => {
                  return (
                    <option key={index} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {errors.department && (
                <small style={{ color: 'red' }}>select department</small>
              )}
            </div>

            <div class="form-group a">
              <label for="hospital">Hospital</label>
              <select
                name="hospital"
                id="hospital"
                className="form-control"
                value={formState.hospital}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select one</option>
                {hospitalData?.map((e, index) => {
                  return (
                    <option key={index} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {errors.hospital && (
                <small style={{ color: 'red' }}>select hospital</small>
              )}
            </div>

            <div class="form-group ">
              <label for="doctor">Doctor</label>
              <select
                name="doctor"
                id="doctor"
                className="form-control"
                value={formState.doctor}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select one</option>
                {doctorsData?.map((e, index) => {
                  return (
                    <option key={index} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {errors.doctor && (
                <small style={{ color: 'red' }}>choose doctor</small>
              )}
            </div>
            <div class="form-group email-group">
              <label for="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formState.date}
                onBlur={handleBlur}
                min={new Date().toISOString()?.split('T')[0]}
                onChange={handleChange}
              />
              {errors.date && (
                <small style={{ color: 'red' }}>date is required</small>
              )}
            </div>

            <div class="form-group phone-group">
              <label for="time">Time</label>
              <select
                name="time"
                id="time"
                className="form-control"
                value={formState.time}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select one</option>
                {availableTimeSlots?.map((e, index) => {
                  return (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
              {errors.time && (
                <small style={{ color: 'red' }}>time is required</small>
              )}
            </div>
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
            <div class="button-container">
              <button class="button">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Consultation;
