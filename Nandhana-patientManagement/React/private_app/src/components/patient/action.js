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

export const getPatient = (page, rowsPerPage, filter) => async (dispatch) => {
  let { data } = await getData(`patient?page=${page}&rowsPerPage=${rowsPerPage}&filterData=${filter}`);
  if (data.statusCode === 200) {
    dispatch({
      type: 'patient',
      payload: data.patients,
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
    dispatch(getPatient());
  } else {
    dispatch(setErrorMessage(data.message));
  }
};
