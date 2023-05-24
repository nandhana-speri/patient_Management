import { combineReducers } from 'redux';

const initialStateCommon = {
  successMessage: null,
  errorMessage: null,
  loader: false,
  role: '',
  profileData: {},
};

// ===================================coomon reducer==================================
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'IS LOGIN':
      return {
        ...state,
        role: action.payload,
      };
    case 'profile':
      return {
        ...state,
        profileData: action.payload,
      };
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
export default combineReducers({
  commonReducer,
});
