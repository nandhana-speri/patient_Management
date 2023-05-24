import {
  setData,
  getData,
  editData,
  deleteData,
  getByIdData,
} from '../../api/service';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderFalse,
  loaderTrue,
} from '../../action';

export const getConsultationCertificate = () => async (dispatch) => {
  let { data } = await getData(`blockChain`);
  if (data.statusCode === 200) {
    dispatch({
      type: 'consultation',
      payload: data.Consultation,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
export const getVaccinationCertificate = () => async (dispatch) => {
  let { data } = await getData(`blockChain/vaccination`);
  console.log(data);
  if (data.statusCode === 200) {
    dispatch({
      type: 'vaccination',
      payload: data.Vaccination,
    });
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
