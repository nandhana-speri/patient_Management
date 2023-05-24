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
  
  export const getPayment = (page, rowsPerPage, filter) => async (dispatch) => {
    let { data } = await getData(`payment?page=${page}&rowsPerPage=${rowsPerPage}&filterData=${filter}`);
    if (data.statusCode === 200) {
      dispatch({
        type: 'payment',
        payload: data.transactionData,
      });
    } else {
      dispatch(setErrorMessage(data.message));
    }
  };

  