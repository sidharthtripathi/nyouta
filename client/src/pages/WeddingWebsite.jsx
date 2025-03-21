import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import TemplateSection from "../components/TemplateSection";
import { logout } from '../utils/Store/slices/authSlice';
import { LogOut, User, ChevronDown } from 'lucide-react';

// Import banner images
import banImg1 from "../assets/images/weddingurl/1.jpg";
import banImg2 from "../assets/images/weddingurl/2.jpg";
import banImg3 from "../assets/images/weddingurl/3.jpg";
import banImg4 from "../assets/images/weddingurl/4.jpg";
import banImg5 from "../assets/images/weddingurl/5.jpg";
import banImg6 from "../assets/images/weddingurl/6.jpg";

// Static wedding templates data
const weddingTemplates = [
    {
        id: 1,
        name: "Classic Elegance",
        description: "A timeless design perfect for traditional weddings",
        category: "Classic",
        thumbnail: "https://via.placeholder.com/400x300"
    },
    {
        id: 2,
        name: "Modern Romance",
        description: "Contemporary design with romantic touches",
        category: "Modern",
        thumbnail: "https://via.placeholder.com/400x300"
    },
    {
        id: 3,
        name: "Rustic Charm",
        description: "Warm and cozy design for intimate celebrations",
        category: "Rustic",
        thumbnail: "https://via.placeholder.com/400x300"
    },
    {
        id: 4,
        name: "Beach Bliss",
        description: "Perfect for destination weddings by the sea",
        category: "Beach",
        thumbnail: "https://via.placeholder.com/400x300"
    }
];

const faqs = [
    {
        id: 1,
        question: "How do I create a website for my wedding?",
        answer:
            "From your free Nyouta account, click on Wedding Website. There, you'll be prompted to choose a template to edit your wedding website. Once you choose a template you'll be able to edit the texts, colours, layout, pages and details. You can also change the template whenever you want if you want to try different styles. When you're done, it's time to share it with your guests! But before you do, we suggest clicking on View as guest to double check that everything looks perfect.",
    },
    {
        id: 2,
        question: "Is it possible to create a wedding website for free?",
        answer:
            "Yes! With Nyouta you can easily create your wedding website in just a couple of clicks. Since we already have most of your wedding information, you'll notice most of your basic details are ready to go, so all you need to do is personalise your website and make it yours.",
    },
    {
        id: 3,
        question: "What should my Wedding Website contain?",
        answer:
            "When you create your Wedding Website, you'll notice that you have five pages: homepage, wedding blog, confirm attendance, contact us and guestbook. Your homepage should summarise your upcoming wedding plans and a personal message for your guests. Don't forget to include your favourite engagement photo! Next, you can use your blog to keep guests updated and take them along on your wedding planning journey.",
    },
    {
        id: 4,
        question: "Can my Wedding Website be private?",
        answer:
            "Yes, to ensure your privacy you have two options. Either you can include a welcome form that will pop up before anyone can see your Wedding Website. The form will collect the names and emails of your guests the first time they visit your website, letting you know who is looking at your website.",
    },
    {
        id: 5,
        question: "What's the point of a Wedding Website?",
        answer:
            "Your Wedding Website is your opportunity to easily share information as well as excitement with your guests. Tell them about what they can expect to help them get ready for your big day and give them a space to leave nice comments in your Guestbook page. All in all, your Wedding Website is a place for you to document your wedding journey and to keep guests in the loop and excited about the upcoming celebration!",
    },
];

const WeddingWebsite = () => {
    const [openId, setOpenId] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    // If user is not logged in, show loading state
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Ensure user object has required properties
    const userName = user?.name || 'User';
    const userEmail = user?.email || '';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Wedding Website</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                >
                                    <User className="h-5 w-5" />
                                    <span>{userName}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            {userEmail}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Carousel */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="carousel w-full h-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={banImg1} alt="Wedding Banner 1" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide6" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={banImg2} alt="Wedding Banner 2" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={banImg3} alt="Wedding Banner 3" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img src={banImg4} alt="Wedding Banner 4" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide5" className="carousel-item relative w-full">
                        <img src={banImg5} alt="Wedding Banner 5" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide6" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide6" className="carousel-item relative w-full">
                        <img src={banImg6} alt="Wedding Banner 6" className="w-full h-full object-cover" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide5" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Create Your Dream Wedding Website</h1>
                        <p className="text-xl md:text-2xl">Beautiful templates for your special day</p>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Choose Your Template</h2>
                <TemplateSection weddingTemplates={weddingTemplates} />
            </div>

            {/* FAQ Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="mb-4">
                                <button
                                    className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">{faq.question}</span>
                                        <span className="transform transition-transform duration-200">
                                            {openId === faq.id ? '−' : '+'}
                                        </span>
                                    </div>
                                </button>
                                {openId === faq.id && (
                                    <div className="p-4 bg-white border border-gray-100 rounded-b-lg">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingWebsite;