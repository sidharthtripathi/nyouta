import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../utils/Store/slices/userSlice';
import { setUser } from '../utils/Store/slices/authSlice';
import defaultProfileImage from '../assets/images/default-image.png';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { profileImage } = useSelector(state => state.user);
    const { isAuthenticated } = useSelector(state => state.auth);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear Redux state
        dispatch(clearUserData());
        dispatch(setUser(null));

        // Navigate to login
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">
                                Wedding Website
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/wedding-website" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-red-500">
                                Home
                            </Link>
                            {/* Add more navigation links as needed */}
                        </div>
                    </div>

                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="ml-3 relative flex items-center space-x-4">
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={profileImage || defaultProfileImage}
                                    alt="Profile"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-gray-500 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}