import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import { getUser, logout } from '../utils/Store/slices/authSlice';
import WeddingWebsiteLogin from './WeddingWebsiteLogin';

const AuthCheck = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            let userId;

            try {
                userId = storedUser ? JSON.parse(storedUser)?._id : null;
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                userId = null;
            }

            if (!token || !userId) {
                dispatch(logout());
                setIsLoading(false);
                return;
            }

            try {
                // Verify token with backend
                await axios.get(`${BASE_URL}/auth/getUser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // If token is valid, get user data
                await dispatch(getUser(userId));
            } catch (error) {
                // If token is invalid or expired, logout
                console.error('Token verification failed:', error);
                dispatch(logout());
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    return (
        <>
            {showLogin && <WeddingWebsiteLogin />}
            {!showLogin && children}
        </>
    );
};

export default AuthCheck; 