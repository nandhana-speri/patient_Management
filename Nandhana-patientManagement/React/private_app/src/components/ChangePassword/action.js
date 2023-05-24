import {
  setData,
  getData,
  editData,
  deleteData,
  getByIdData,
  driverApprovalReqs,
} from '../../api/service';
import { loaderFalse, setErrorMessage, setSuccessMessage } from '../../action';

// ================================listing driver action=====================
export const changePasswordAction =
  (url, props, navigate) => async (dispatch) => {
    const { data } = await setData(url, props);
    console.log(data);
    dispatch(loaderFalse());
    if (data.statusCode === 200) {
      dispatch(setSuccessMessage(data?.message));
    } else {
      dispatch(setErrorMessage(data?.message));
    }
  };
