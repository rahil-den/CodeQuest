import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth.jsx';

const ProtectedRoute = ({ children }) => {

    let { token } = useAuth();

    return token ? children : <Navigate to='/login' noThrow />;
};

export default ProtectedRoute;