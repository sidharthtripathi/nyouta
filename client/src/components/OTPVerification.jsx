import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../utils/Store/slices/authSlice';
import { motion } from 'framer-motion';

const OTPVerification = ({ email, onVerificationComplete }) => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(verifyEmail({ emailorphone: email, otp }));
        if (!result.error) {
            onVerificationComplete();
        }
    };

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
                    Verify Your Email
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Please enter the verification code sent to<br />
                    <span className="font-medium">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-center text-2xl tracking-wider"
                            required
                            maxLength={6}
                            pattern="[0-9]{6}"
                            placeholder="Enter 6-digit code"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-medium text-white transition
              ${loading
                                ? "bg-rose-300 cursor-not-allowed"
                                : "bg-rose-500 hover:bg-rose-600"
                            }`}
                        disabled={loading || otp.length !== 6}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default OTPVerification; 