import { setData } from '.././api/service';

export const contactPost = (url, props, navigate) => async (dispatch) => {
  const { data } = await setData(url, props);
  dispatch(loaderFalse());
  if (data.statusCode === 200) {
    dispatch(setSuccessMessage(data?.message));
  } else {
    dispatch(setErrorMessage(data?.message));
  }
};

export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  dispatch({
    type: 'LOADER_FALSE',
  });
};
