import { combineReducers } from 'redux';
const initialState = {
  listContact: [],
  contactById: '',
};

// ======================contact reducer=========================
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contact List':
      return {
        ...state,
        listContact: action.payload,
      };
    case 'GET BY ID':
      return {
        ...state,
        contactById: action.payload,
      };

    default:
      return state;
  }
};
export default contactReducer;
