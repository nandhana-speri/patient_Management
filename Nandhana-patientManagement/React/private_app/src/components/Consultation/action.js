import {
  setData,
  getData,
  editData,
  deleteData,
  getByIdData,
  editDatas,
} from '../../api/service';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderFalse,
  loaderTrue,
} from '../../action';

export const getDepartment = () => async (dispatch) => {
  let { data } = await getData('seeder/department');
  if (data.statusCode === 200) {
    dispatch({
      type: 'department',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const getConsultationById = (id) => async (dispatch) => {
  let { data } = await getByIdData(`consultation`, id);
  if (data.statusCode === 200) {
    dispatch({
      type: 'get consultation by id',
      payload: data.consultationInfo,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getHospital = () => async (dispatch) => {
  let { data } = await getData('seeder/hospital');
  if (data.statusCode === 200) {
    dispatch({
      type: 'hospital',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getDoctor =
  (departmentId, hospitalId, time, date, doctor) => async (dispatch) => {
    let { data } = await getData(
      `seeder/doctor?departmentId=${departmentId}&hospitalId=${hospitalId}&time=${time}&date=${date}&doctorId=${doctor}`
    );
    if (data.statusCode === 200) {
      dispatch({
        type: 'doctors',
        payload: data.data,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  };
export const getDoctorByDate = (date, doctor) => async (dispatch) => {
  let { data } = await getData(
    `seeder/getDoctor?date=${date}&doctorId=${doctor}`
  );
  console.log(data.consultations);
  if (data.statusCode === 200) {
    dispatch({
      type: 'doctorsByDate',
      payload: data.consultations,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const consultationData = (props, navigate) => async (dispatch) => {
  let { data } = await setData('consultation', props);
  dispatch(loaderFalse());
  if (data.status === true) {
    dispatch(setSuccessMessage(data?.message));
    dispatch(getConsultation(1, 5));
    navigate('/consultation');
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const getConsultation =
  (page, rowsPerPage, filter) => async (dispatch) => {
    console.log(page, rowsPerPage);
    let { data } = await getData(
      `consultation?page=${page}&rowsPerPage=${rowsPerPage}&filterData=${filter}`
    );
    if (data.statusCode === 200) {
      dispatch({
        type: 'consultation',
        payload: data.consultationInfo,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  };

export const CertificateCreation =
  (props, page, rowsPerPage) => async (dispatch) => {
    dispatch(loaderFalse());
    let { data } = await setData(`blockChain`, props);
    if (data.status === true) {
      dispatch({
        type: 'consultationCertificate',
        payload: data.consultationInfo,
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
    dispatch(getConsultation(1, 5));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const cancelAction = (url, id, navigate) => async (dispatch) => {
  let { data } = await editDatas(url, id);
  if (data.statusCode === 200) {
    dispatch(loaderFalse());
    dispatch(setSuccessMessage(data?.message));
    dispatch(getConsultation(1, 5));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
