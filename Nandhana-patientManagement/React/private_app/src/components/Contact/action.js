import {
  setData,
  getData,
  editData,
  deleteData,
  getByIdData,
} from '../../api/service';
import { loaderFalse, setErrorMessage, setSuccessMessage } from '../../action';

// ====================getting full contact list====================
export const getContact = (url) => async (dispatch) => {
  const { data } = await getData(url);
  dispatch(loaderFalse());
  if (data.statusCode === 200) {
    dispatch({
      type: 'contact List',
      payload: data.data,
    });
  } else {
    dispatch(setErrorMessage(data?.data?.message));
  }
};

// ====================contact edit========================
export const contactPatch = (id, props, navigate) => async (dispatch) => {
  const { data } = await editData(`contact/${id}`, props);
  if (data.statusCode === 200) {
    // dispatch(setSuccessMessage(data.message));
    dispatch(getContact('/contact'));
    navigate('/contact');
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

// =======================getting contact by id=======================
export const getMessage = (id) => async (dispatch) => {
  const { data } = await getByIdData('contact', id);
  if (data.statusCode === 200) {
    dispatch({
      type: 'GET BY ID',
      payload: data.dataCheck,
    });
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};
