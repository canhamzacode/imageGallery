import { Route, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'; // Import useState and useEffect
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

    return isLoading ? (
        <Loading />
    ) : user ? (
        element
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoute;