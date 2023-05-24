import {
  loaderFalse,
  setErrorMessage,
  setProfile,
  setSuccessMessage,
} from '../../action';
import { setData, getData, editData, deleteData } from '../../api/service';

// =========================profile=================
export const healthInformationAction = (props) => async (dispatch) => {
  let { data } = await setData('health/information', props);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data.message));
    dispatch(getHealthInformation());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const diseasePostAction = (props) => async (dispatch) => {
  let { data } = await setData('disease', props);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data.message));
    dispatch(getdiseaseInformation());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const healthInformationEditAction = (props) => async (dispatch) => {
  let { data } = await editData('health/information', props);
  console.log(data);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data.message));
    dispatch(getHealthInformation());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const profileEditAction = (props) => async (dispatch) => {
  let { data } = await editData('profile', props);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data.message));
    dispatch(setProfile());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getHealthInformation = (props) => async (dispatch) => {
  let { data } = await getData('health/information');
  if (data.statusCode === 200) {
    dispatch({
      type: 'health information',
      payload: data.healthInfo,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const getdiseaseInformation = (props) => async (dispatch) => {
  let { data } = await getData('disease');
  if (data.statusCode === 200) {
    dispatch({
      type: 'disease information',
      payload: data.diseaseInfo,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const diseaseListGetAction = () => async (dispatch) => {
  let { data } = await getData('seeder/diseaseList');
  if (data.statusCode === 200) {
    dispatch({
      type: 'diseaseList',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const deleteDiseaseAction = (id) => async (dispatch) => {
  console.log(id);
  let { data } = await deleteData('disease', id);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data?.message));
    dispatch(getdiseaseInformation());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
