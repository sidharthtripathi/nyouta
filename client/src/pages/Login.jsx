import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleSignup, verifyEmail } from '../utils/Store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const data = {
            emailorphone: formData.email,
            password: formData.password
        };

        try {
            const res = await dispatch(login(data));
            if (res.type === 'auth/login/fulfilled') {
                if (res.payload.requiresOtp) {
                    setIsOtpModalOpen(true);
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = async (response) => {
        try {
            const res = await dispatch(googleSignup(response));
            if (res.type === 'auth/googleSignup/fulfilled') {
                navigate("/");
            }
        } catch (err) {
            setError(err.message || 'Google login failed. Please try again.');
        }
    };

    const handleOTP = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const data = {
                otp: otp,
                emailorphone: formData.email,
            };
            const res = await dispatch(verifyEmail(data));
            if (res.type === 'auth/verifyEmail/fulfilled') {
                setIsOtpModalOpen(false);
                navigate("/");
            }
        } catch (err) {
            setError(err.message || 'OTP verification failed. Please try again.');
        }
    };

    const OtpModal = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Verification Code</h2>
                <p className="text-gray-600 mb-6">
                    Please enter the 6-digit code sent to your email address
                </p>
                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 6) setOtp(value);
                    }}
                    maxLength={6}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setIsOtpModalOpen(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleOTP}
                        disabled={otp.length !== 6 || loading}
                        className={`px-6 py-2 rounded-lg text-white transition-colors
              ${loading || otp.length !== 6
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm"
                        >
                            {error}
                        </motion.p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors
                ${loading
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => setError('Google login failed. Please try again.')}
                            type="standard"
                            text="continue_with"
                            theme="outline"
                            shape="rectangular"
                            disabled={loading}
                        />
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {isOtpModalOpen && <OtpModal />}
            </AnimatePresence>
        </div>
    );
}