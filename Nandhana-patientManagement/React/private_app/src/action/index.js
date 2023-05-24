import { setData, getData, editData, deleteData } from '.././api/service';

// =========================profile=================
export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('accessTocken');
  let { data } = await getData('auth/profile', { accessTocken: tocken });
  console.log(data);
  if (data.statusCode === 200  ) {
    if(data.profile?.login?.role==='patient'){
    dispatch({
      type: 'IS LOGIN',
      payload: data.profile?.login?.role,
    });
  }else{
    dispatch({
      type: 'IS LOGIN',
      payload: data.profile?.role,
    });
  }
    dispatch({
      type: 'profile',
      payload: data.profile,
    });
  } else {
    console.log(data.message);
  }
};
// ==============================common action==========================================
export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('accessTocken');
  localStorage.removeItem('role');
  dispatch({
    type: 'IS LOGIN',
    payload: '',
  });
  navigate('/');
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
