import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/Store/slices/authSlice';
import { setUserData } from '../utils/Store/slices/userSlice';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 'jwt-decode';

export default function LoginRegister() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Fix selector memoization
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Screen size check
    const checkSmallScreen = () => window.innerWidth < 768;

    useEffect(() => {
        setIsSmallScreen(checkSmallScreen());
        const handleResize = () => setIsSmallScreen(checkSmallScreen());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Set the active panel based on the current path
        if (location.pathname === '/register') {
            setIsRightPanelActive(true);
        } else if (location.pathname === '/login') {
            setIsRightPanelActive(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/wedding-website');
        }
    }, [isAuthenticated, navigate]);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
        navigate('/register');
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRightPanelActive) {
            // Sign Up logic
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            try {
                // For testing registration
                if (formData.email === 'test@gmail.com' && formData.password === 'test123') {
                    toast.success('Test registration successful!');
                    setIsRightPanelActive(false);
                    navigate('/login');
                    return;
                }

                const response = await fetch('/api/v1/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        emailorphone: formData.email,
                        password: formData.password,
                        name: formData.name
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }

                toast.success('Registration successful! Please verify your email.');
                setIsRightPanelActive(false);
                navigate('/login');
            } catch (error) {
                toast.error(error.message || 'Registration failed');
            }
        } else {
            // Sign In logic
            try {
                // For testing login
                if (formData.email === 'test@gmail.com' && formData.password === 'test123') {
                    const testUser = {
                        id: 'test123',
                        name: 'Test User',
                        email: 'test@gmail.com',
                        role: 'user'
                    };

                    // Store test token and user data
                    localStorage.setItem('token', 'test-token-123');
                    localStorage.setItem('user', JSON.stringify(testUser));

                    // Update Redux state
                    dispatch(setUser(testUser));

                    toast.success('Test login successful!');
                    navigate('/wedding-website');
                    return;
                }

                const response = await fetch('/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        emailorphone: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Update Redux state
                dispatch(setUser(data.user));

                navigate('/wedding-website');
            } catch (error) {
                toast.error(error.message || 'Login failed');
            }
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            // Decode the credential to get user info
            const decoded = jwtDecode(credentialResponse.credential);

            // Store the complete Google user data in userSlice
            dispatch(setUserData({
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                given_name: decoded.given_name,
                family_name: decoded.family_name,
                locale: decoded.locale
            }));

            // For now, skip the API call and use the decoded data directly
            // This will allow testing the flow without the backend
            const userData = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                role: 'user'
            };

            // Store token and user data
            localStorage.setItem('token', credentialResponse.credential); // Use the credential as token
            localStorage.setItem('user', JSON.stringify(userData));

            // Update Redux auth state
            dispatch(setUser(userData));

            toast.success('Google login successful!');
            navigate('/wedding-website');

            /* Commenting out the API call for now
            const response = await fetch('/api/v1/auth/google-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                    clientId: credentialResponse.clientId
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Google login failed');
            }

            // Store token and basic auth data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Update Redux auth state
            dispatch(setUser(data.user));

            navigate('/wedding-website');
            */
        } catch (error) {
            console.error('Google login error:', error);
            toast.error(error.message || 'Google login failed. Please try again.');
        }
    };

    const GoogleLoginButton = ({ className }) => (
        <div className={`flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-500 hover:text-gray-700 ${className || ''}`}>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    toast.error('Google login failed');
                }}
                useOneTap={false}
                auto_select={false}
                type="standard"
                text="continue_with"
                theme="dark"
                shape="square"
            />
        </div>
    );

    // Desktop version
    const DesktopVersion = () => (
        <div className={`relative md:mx-[25%] mx-2 my-10 max-w-[768px] min-h-[500px] rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-700 ease-in-out ${isRightPanelActive ? "right-panel-active" : ""}`}>
            {/* Sign Up Form */}
            <div className={`absolute top-0 left-0 h-full w-1/2 p-4 sm:p-12 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${isRightPanelActive ? "translate-x-full opacity-100 z-10" : "translate-x-0 opacity-0 z-0"}`}>
                <form className="text-center w-full" onSubmit={handleSubmit}>
                    <h1 className="font-bold text-xl mb-4 transform transition-all duration-500">Create Account</h1>
                    <div className="flex justify-center items-center gap-2 mb-2">
                        {isRightPanelActive && <GoogleLoginButton />}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">or use your account</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        autoComplete="off"
                        className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                            onClick={() => togglePasswordVisibility('password')}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="px-8 py-3 mt-4 rounded-full bg-red-500 text-white uppercase font-bold hover:bg-red-600 transform transition-all duration-300 hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className={`absolute top-0 left-0 h-full w-1/2 p-4 sm:p-12 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${isRightPanelActive ? "-translate-x-full opacity-0 z-0" : "translate-x-0 opacity-100 z-10"}`}>
                <form className="text-center w-full" onSubmit={handleSubmit}>
                    <h1 className="font-bold text-2xl mb-4">Sign In</h1>
                    <div className="flex justify-center items-center gap-4 mb-4">
                        {!isRightPanelActive && <GoogleLoginButton />}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">or use your account</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                            onClick={() => togglePasswordVisibility('password')}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="px-8 py-3 mt-4 rounded-full bg-red-500 text-white uppercase font-bold hover:bg-red-600 transform transition-all duration-300 hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>
            </div>

            {/* Overlay Section */}
            <div className={`absolute top-0 left-1/2 h-full w-1/2 overflow-hidden transition-all duration-700 ease-in-out transform z-20 ${isRightPanelActive ? "-translate-x-full" : "translate-x-0"}`}>
                <div className="absolute w-full inset-0 bg-gradient-to-r from-yellow-700 to-yellow-500 flex">
                    <div className={`absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center p-6 sm:p-10 transition-all duration-700 ease-in-out transform ${isRightPanelActive ? "translate-x-0" : "-translate-x-full"}`}>
                        <h1 className="font-bold text-2xl text-white mb-4 transform transition-all duration-500">Hello, Friend!</h1>
                        <p className="text-sm text-white mb-4 transform transition-all duration-500">Enter your personal details and start your journey with us</p>
                        <button
                            type="button"
                            className="px-8 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-yellow-700 transform transition-all duration-300 hover:scale-105"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className={`absolute top-0 right-0 h-full w-full flex flex-col items-center justify-center p-10 transition-all duration-700 ease-in-out transform ${isRightPanelActive ? "translate-x-full" : "translate-x-0"}`}>
                        <h1 className="font-bold text-2xl text-white mb-4 transform transition-all duration-500">Welcome Back!</h1>
                        <p className="text-sm text-white mb-4 transform transition-all duration-500">To keep connected with us, please login with your personal info</p>
                        <button
                            type="button"
                            className="px-8 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-yellow-700 transform transition-all duration-300 hover:scale-105"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Mobile version
    const MobileVersion = () => (
        <div className="flex flex-col items-center justify-center mx-4 my-10 max-w-lg w-full p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6">Welcome</h1>
            <div className="flex gap-4 mb-6">
                <button
                    type="button"
                    className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${isRightPanelActive
                        ? "bg-gray-300 hover:bg-gray-400"
                        : "bg-gradient-to-r from-yellow-700 to-yellow-500 text-white hover:from-yellow-800 hover:to-yellow-600"
                        }`}
                    onClick={handleSignInClick}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${isRightPanelActive
                        ? "bg-gradient-to-r from-yellow-700 to-yellow-500 text-white hover:from-yellow-800 hover:to-yellow-600"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    onClick={handleSignUpClick}
                >
                    Sign Up
                </button>
            </div>

            {/* Form content with transitions */}
            <div className="w-full transition-all duration-500 ease-in-out">
                {isRightPanelActive ? (
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Create Account</h2>
                        {isRightPanelActive && <GoogleLoginButton className="mb-4" />}
                        <p className="text-sm text-gray-500 mb-4">or use your email for registration</p>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="relative mb-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                autoComplete="off"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                autoComplete="off"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transform transition-all duration-300 hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Sign In</h2>
                        {!isRightPanelActive && <GoogleLoginButton className="mb-4" />}
                        <p className="text-sm text-gray-500 mb-4">or use your email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="relative mb-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                autoComplete="off"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:text-red-500"
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transform transition-all duration-300 hover:scale-105"
                        >
                            Sign In
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    return (
        <>
            {!isSmallScreen ? <DesktopVersion /> : <MobileVersion />}
        </>
    );
}