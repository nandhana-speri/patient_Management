import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const Role = localStorage.getItem('accessTocken')
    ? localStorage.getItem('accessTocken')
    : '';
  if (!Role) {
    return <Navigate to="/" />;
  }

  return children;
};
export default PrivateRoute;
