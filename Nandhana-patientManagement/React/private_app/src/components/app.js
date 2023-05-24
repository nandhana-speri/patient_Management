import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { resetErrorMessage, resetSuccessMessage } from '../action/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import { setProfile } from '../action/index';
import Footer from './Footer/footer';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};
const App = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.commonReducer);
  const { successMessage, errorMessage } = useSelector(
    (state) => state.commonReducer
  );

  //=======================profile=======================
  useEffect(() => {
    if (localStorage.getItem('accessTocken')) {
      dispatch(setProfile());
    }
  }, []);

  //====================toaster======================
  useEffect(() => {
    if (successMessage) {
      console.log(successMessage);
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer />
      <Header />
      {!role ? (
        <div style={{ margin: '3%' }}>
          <Outlet />
 
        </div>
      ) : null}
    </div>
  );
};
export default App;
