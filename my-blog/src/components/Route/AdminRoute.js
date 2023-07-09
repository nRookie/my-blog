// AdminRoute.js
import { useContext, useEffect } from 'react';
import { useNavigate,Route } from 'react-router-dom';
import { AuthContext } from './AuthProvider'; // Assuming you have AuthProvider context

const AdminRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in or not an admin, redirect to home
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Route {...rest} element={user && user.role === 'admin' ? element : null} />
  );
};

export default AdminRoute;
