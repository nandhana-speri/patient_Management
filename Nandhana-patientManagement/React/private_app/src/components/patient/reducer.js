import { combineReducers } from 'redux';

const initialStateCommon = {
  patientData: [],
  patientCount: null,
};

// ===================================coomon reducer==================================
const patientReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'patient':
      return {
        ...state,
        patientData: action.payload,
      };

    default:
      return state;
  }
};
export default patientReducer;
