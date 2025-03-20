import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, register, googleSignup } from '../utils/Store/slices/authSlice';
import { Eye, EyeOff } from "lucide-react";
import OTPVerification from './OTPVerification';

const WeddingWebsiteLogin = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    setFormErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const credentials = {
      emailorphone: formData.email,
      password: formData.password,
      ...(isLoginMode ? {} : { name: formData.name })
    };

    const action = isLoginMode ? login(credentials) : register(credentials);
    const result = await dispatch(action);

    if (!result.error) {
      if (result.payload?.requiresOtp) {
        setShowOTP(true);
      } else {
        navigate("/complete-registration");
      }
    }
  };

  // Handle Google login response
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const result = await dispatch(googleSignup({
        credential: credentialResponse.credential,
        clientId: credentialResponse.clientId,
        decoded
      }));

      if (!result.error) {
        navigate("/complete-registration");
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!isLoginMode && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    return errors;
  };

  // Handle mode switch
  const handleModeSwitch = () => {
    setIsLoginMode(!isLoginMode);
    setFormErrors({});
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  if (showOTP) {
    return (
      <OTPVerification
        email={formData.email}
        onVerificationComplete={() => {
          setShowOTP(false);
          navigate("/complete-registration");
        }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white/95 rounded-2xl p-8 w-full max-w-md shadow-2xl backdrop-blur-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLoginMode ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLoginMode
            ? "Sign in to manage your wedding details"
            : "Sign up to create and manage your wedding details"
          }
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors
                  ${formErrors.name
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-rose-500'
                  }
                `}
                required={!isLoginMode}
                disabled={loading}
                placeholder="Enter your full name"
                maxLength={50}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors
                ${formErrors.email
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-rose-500'
                }
              `}
              required
              disabled={loading}
              placeholder="Enter your email address"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors pr-10
                  ${formErrors.password
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-rose-500'
                  }
                `}
                required
                disabled={loading}
                placeholder="Enter your password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-white transition
              ${loading
                ? "bg-rose-300 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
              }`}
            disabled={loading}
          >
            {loading ? "Processing..." : (isLoginMode ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="mt-6 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative px-4 text-sm text-gray-500 bg-white">
            Or continue with
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.error("Google authentication failed");
            }}
            disabled={loading}
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleModeSwitch}
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            {isLoginMode ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WeddingWebsiteLogin;