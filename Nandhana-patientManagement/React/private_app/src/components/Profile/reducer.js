const initialStateCommon = {
  healthInfo: {},
  diseaseList: [],
  diseaseInfo: [],
};

// ===================================coomon reducer==================================
const profileReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'health information':
      return {
        ...state,
        healthInfo: action.payload,
      };
    case 'diseaseList':
      return {
        ...state,
        diseaseList: action.payload,
      };
    case 'disease information':
      return {
        ...state,
        diseaseInfo: action.payload,
      };

    default:
      return state;
  }
};
export default profileReducer;
