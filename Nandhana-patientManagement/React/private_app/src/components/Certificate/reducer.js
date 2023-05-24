import { combineReducers } from 'redux';

const initialStateCommon = {
  certificateDatas: [],
  vaccinationCertData: [],
};

// ===================================coomon reducer==================================
const CertificateReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'consultation':
      return {
        ...state,
        certificateDatas: action.payload.rows,
      };
    case 'vaccination':
      return {
        ...state,
        vaccinationCertData: action.payload.rows,
      };

    default:
      return state;
  }
};
export default CertificateReducer;
