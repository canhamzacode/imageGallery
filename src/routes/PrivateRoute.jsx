import { Route, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false); // New state

    useEffect(() => {
        // Simulate loading user data (replace with your actual fetch logic)
        setTimeout(() => {
            setIsLoading(false); // Mark loading as finished
            setUserLoaded(true); // Mark user data as loaded
        }, 4000); // Adjust the delay as needed
    }, []);

    // If user data is not yet loaded, show loading; if not logged in, redirect to login
    if (isLoading) {
        return <Loading />;
    } else if (!userLoaded || !user) {
        // You can use the Navigate component or any other navigation method here
        // Example using Navigate:
        return <Navigate to="/login" />;
    } else {
        // If user data is loaded and the user is logged in, render the protected route
        return element;
    }
}

export default PrivateRoute;