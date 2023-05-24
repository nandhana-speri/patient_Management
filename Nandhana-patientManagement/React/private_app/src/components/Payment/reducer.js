import { combineReducers } from 'redux';

const initialStateCommon = {
 paymentData:[]
};

// ===================================coomon reducer==================================
const paymentReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'payment':
      return {
        ...state,
        paymentData: action.payload.rows,
        paymentCount: action.payload.count,
      };
   

    default:
      return state;
  }
};
export default paymentReducer;
