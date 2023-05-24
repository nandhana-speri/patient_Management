import { combineReducers } from 'redux';

const initialStateCommon = {
  departmentData: [],
  hospitalData: [],
  doctorsData: [],
  consultationData: [],
  consultationCount: null,
  consultationDataById: {},
};

// ===================================coomon reducer==================================
const consultationReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'department':
      return {
        ...state,
        departmentData: action.payload,
      };
    case 'hospital':
      return {
        ...state,
        hospitalData: action.payload,
      };
    case 'doctors':
      return {
        ...state,
        doctorsData: action.payload,
      };
    case 'doctorsByDate':
      return {
        ...state,
        doctorsDataByDate: action.payload,
      };
    case 'consultation':
      return {
        ...state,
        consultationData: action.payload.rows,
        consultationCount: action.payload.count,
      };
    case 'get consultation by id':
      return {
        ...state,
        consultationDataById: action.payload,
      };

    default:
      return state;
  }
};
export default consultationReducer;
