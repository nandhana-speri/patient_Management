import { setData, getData, editData, deleteData } from '../../api/service';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderFalse,
  loaderTrue,
} from '../../action';

// =========================registeration post action=================
export const getVaccine = (url, props, navigate) => async (dispatch) => {
  let { data } = await getData('seeder/vaccine');
  if (data.statusCode === 200) {
    dispatch({
      type: 'vaccine list',
      payload: data.vaccineList,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const getVaccination = (page, perpage, filter) => async (dispatch) => {
  let { data } = await getData(
    `vaccination?page=${page}&rowsPerPage=${perpage}&filterData=${filter}`
  );
  if (data.statusCode === 200) {
    dispatch({
      type: 'vaccination',
      payload: data.vaccinationInfo,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const deleteAction = (url, id, navigate) => async (dispatch) => {
  let { data } = await deleteData(url, id);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data?.message));
    dispatch(getVaccination());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const vaccinationData = (props, navigate) => async (dispatch) => {
  let { data } = await setData('vaccination', props);
  console.log('lbevcgec', data);
  if (data.status === true) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data?.message));
    dispatch(getVaccination(1, 5));
    navigate('/vaccination');
  } else {
    dispatch(loaderFalse());
    dispatch(setErrorMessage(data.message));
  }
};
export const certificateGenerationAction =
  (props, navigate) => async (dispatch) => {
    let { data } = await setData('blockChain/vaccination', props);
    dispatch(loaderFalse());
    if (data.status === true) {
      dispatch(loaderFalse());
      dispatch(setSuccessMessage(data?.message));
      dispatch(getVaccination(1, 5));
      navigate('/vaccination');
    } else {
      dispatch(setErrorMessage(data.message));
    }
  };
