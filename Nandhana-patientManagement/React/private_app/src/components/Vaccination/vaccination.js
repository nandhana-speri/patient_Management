import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../action';
import { getVaccine, vaccinationData } from './action';
import { TailSpin } from 'react-loader-spinner';
import Web3 from 'web3';
import moment from 'moment';
import { getHospital } from '../Consultation/action';

const Vaccination = () => {
  const [formState, setFormState] = useState({
    vaccine: '',
    date: '',
    time: '',
    hospital: '',
  });
  const { hospitalData } = useSelector((state) => state.consultationReducer);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  //============================= validation schema===========================
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
    hospital: Joi.string().required().messages({
      'string.empty': `hospital is required `,
      'any.required': `hospital is a required field`,
    }),
  });
  const dispatch = useDispatch();
  const { vaccineData } = useSelector((state) => state.vaccineReducer);
  const { loader } = useSelector((state) => state.commonReducer);
  useEffect(() => {
    dispatch(getVaccine());
    dispatch(getHospital());
  }, []);

  // time filtering function
  const generateTimeSlots = () => {
    const currentTime = moment();
    const eveningTime = moment()
      .endOf('day')
      .set({ hour: 17, minute: 0, second: 0 });
    const timeSlots = [];

    const selectedDate = moment(formState.date);
    const isToday = selectedDate.isSame(currentTime, 'day');

    if (isToday) {
      currentTime.startOf('hour').add(1, 'hour');
    } else {
      currentTime.set({ hour: 10, minute: 0, second: 0 });
    }
    while (currentTime.isBefore(eveningTime)) {
      timeSlots.push(currentTime.format('hh:mmA'));
      currentTime.add(1, 'hour').startOf('hour');
    }
    console.log(timeSlots);
    return timeSlots;
  };
  const availableTimeSlots = generateTimeSlots();
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
          dispatch(vaccinationData({ formState, result }, navigate));
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
        <h1 class="title">Vaccination</h1>
        <form onSubmit={handleSubmit}>
          <div class="grid">
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
            <div class="form-group b">
              <label for="vaccine">Vaccine</label>
              <select
                name="vaccine"
                id="vaccine"
                className="form-control"
                value={formState.vaccine}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">select one</option>
                {vaccineData?.map((e, index) => {
                  return (
                    <option key={index} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {errors.vaccine && (
                <small style={{ color: 'red' }}>please select vaccine</small>
              )}
            </div>

            <div class="form-group a">
              <label for="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formState.date}
                min={new Date().toISOString()?.split('T')[0]}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.date && (
                <small style={{ color: 'red' }}>select date</small>
              )}
            </div>

            <div class="form-group ">
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

export default Vaccination;
