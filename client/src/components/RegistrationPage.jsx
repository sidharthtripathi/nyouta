import React, { useState, useEffect } from 'react';
import weddingImage from '../assets/images/registrationform.jpeg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const WeddingRegistrationForm = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        partnerType: 'bride', // default selection
        partnerName: '',
        weddingDate: ''
    });

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            toast.error('Please login to register your wedding');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Here you would typically make an API call to save the wedding registration
            // For now, we'll just show a success message and navigate
            toast.success('Wedding registration successful!');
            navigate("/wedding-website");
        } catch (error) {
            toast.error('Failed to register wedding. Please try again.');
        }
    };

    // If not authenticated, don't render the form
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full mx-4 flex">
                {/* Left side - Wedding image */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src={weddingImage}
                        alt="Wedding"
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white text-center bg-gradient-to-t from-black/60 to-transparent">
                        <h2 className="text-2xl font-bold mb-1">Plan your wedding</h2>
                        <p className="text-xl mb-2">hassle free</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 mt-10">
                    <h1 className="text-xl font-medium text-center mb-4">Wedding Registration</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                You are the
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="partnerType"
                                        value="bride"
                                        checked={formData.partnerType === 'bride'}
                                        onChange={handleInputChange}
                                        className="mr-2 text-rose-500 focus:ring-rose-500"
                                    />
                                    <span className="text-sm">Bride</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="partnerType"
                                        value="groom"
                                        checked={formData.partnerType === 'groom'}
                                        onChange={handleInputChange}
                                        className="mr-2 text-rose-500 focus:ring-rose-500"
                                    />
                                    <span className="text-sm">Groom</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-1">
                                {formData.partnerType === 'bride' ? 'Groom\'s' : 'Bride\'s'} Name
                            </label>
                            <input
                                type="text"
                                id="partnerName"
                                name="partnerName"
                                value={formData.partnerName}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="weddingDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Wedding Date
                            </label>
                            <input
                                type="date"
                                id="weddingDate"
                                name="weddingDate"
                                value={formData.weddingDate}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition mt-2"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WeddingRegistrationForm;