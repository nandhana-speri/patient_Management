const initialStateAuth = {
  vaccineData: [],
  vaccinationData:[],
  vaccinationCount:null
};

const vaccineReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'vaccine list':
      return {
        ...state,

        vaccineData: action.payload,
      };
      case 'vaccination':
        return {
          ...state,
  
          vaccinationData: action.payload.rows,
          vaccinationCount: action.payload.count,

        };

    default:
      return state;
  }
};

export default vaccineReducer;
