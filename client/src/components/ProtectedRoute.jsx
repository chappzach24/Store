import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;