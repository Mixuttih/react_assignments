import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children}) => {
    const {user, isLoading} = useUserContext();

    if (isLoading) {
        return <p role="status">Checking login...</p>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
