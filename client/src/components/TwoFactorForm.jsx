import React from 'react';
import { Mail, AlertCircle } from 'lucide-react';

const TwoFactorForm = ({ email, onSubmit, onResend, isLoading, error, verificationSent }) => {
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-6">
                <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
                <p className="text-gray-600 mt-2">
                    We've sent a verification code to {email}
                </p>
            </div>

            {verificationSent && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    <div className="flex items-center">
                        <span className="text-sm">Verification code sent successfully!</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span className="text-sm">{error}</span>
                    </div>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        id="twoFactorCode"
                        name="twoFactorCode"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the code"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onResend}
                        className="text-sm text-blue-600 hover:text-blue-800"
                        disabled={isLoading}
                    >
                        Resend Code
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                </button>
            </form>
        </div>
    );
};

export default TwoFactorForm; 