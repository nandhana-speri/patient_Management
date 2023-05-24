import {
  setData,
  getData,
  editData,
  deleteData,
  getByIdData,
} from '../../api/service';
import { loaderFalse, setErrorMessage, setSuccessMessage } from '../../action';

export const islogin = (url, loginData, navigate) => async (dispatch) => {
  console.log(loginData);
  let { data } = await setData(url, loginData);
  if (data.statusCode === 200) {
    localStorage.setItem('accessTocken', data?.data?.accessToken);
    localStorage.setItem('role', data?.data?.role);
    dispatch({
      type: 'IS LOGIN',
      payload: data.data.role,
      permission: data.data.permission,
    });
    dispatch(setSuccessMessage('Login success'));
    navigate('/dashboard');
  } else {
    console.log(data);
    dispatch(setErrorMessage(data?.msg));
  }
};

export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('accessTocken');
  let { data } = await setData('/permission/profile', { accessTocken: tocken });
  // console.log(data);
  dispatch({
    type: 'IS_LOGIN',
    permission: data.data.permission,
    payload: data.data.role,
  });
};
