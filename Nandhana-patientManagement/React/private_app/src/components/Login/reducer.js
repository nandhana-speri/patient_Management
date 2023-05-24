const initialStateAuth = {
  islogin: localStorage.getItem('accessTocken')
    ? localStorage.getItem('accessTocken')
    : null,
  role: '',
  permission: [],
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS LOGIN':
      return {
        ...state,
        islogin: localStorage.getItem('accessTocken'),
        role: action.payload,
        permission: action.permission,
      };
     
    case 'LOGOUT':
      return {
        ...state,
        role: null,
        permission: null,
      };
    default:
      return state;
  }
};

export default authReducer;
