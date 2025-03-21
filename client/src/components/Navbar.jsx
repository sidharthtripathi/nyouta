import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
} from "lucide-react";
import logo from "../assets/images/nyouta-logo2.jpg";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/Store/slices/authSlice";
import { clearUserData } from '../utils/Store/slices/userSlice';
import defaultProfileImage from '../assets/images/default-image.png';

const navItems = [
    {
        label: "Home",
        url: "/",
    },
    {
        label: "Wedding Website",
        url: "/create-wedding-website",
    }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profileImage } = useSelector(state => state.user);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear Redux state
        dispatch(clearUserData());
        dispatch(logout());

        // Navigate to login
        navigate('/login');
    };

    return (
        <div className="flex flex-col">
            <div className="h-[30px] flex justify-between px-6 lg:px-56 sm:px-8 bg-[#FAF0DC]">
                <div className="bg-[#af7d32] rounded-b-2xl text-white font-avalonN ms-4 sm:ms-0 flex items-center justify-center px-2 sm:px-4 tracking-widest text-lg sm:text-2xl font-bold">
                    NYOUTA
                </div>
                <div className="sm:flex hidden items-center sm:me-0 lg:me-10">
                    <marquee className="text-[#643C28] font-extrabold text-sm sm:text-base lg:text-lg">
                        Celebrate Your Event with Savings – Shop Now for Discounts! | Get Ready for Your Event – Special Discounts Inside! | Plan Perfect Weddings at a Discount – Limited Time Offer! | Show us your selfie with our portal and unlock a special discount just for you!
                    </marquee>
                </div>
            </div>

            <header className={`sticky top-0 z-50 w-full transition-all border-b-2 border-primary ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
                <div className="container mx-auto">
                    <div className="flex h-18 items-center justify-between px-4">
                        <Link to="/" className="flex items-center py-2 lg:pl-12 gap-2">
                            <img className="lg:w-56 w-36" src={logo} alt="logo-imgh" />
                        </Link>

                        <div className="flex items-center gap-1 lg:gap-4">
                            <a
                                href="/join-e-nyouta"
                                className="text-pink-600 font-avalonN hidden lg:flex leading-none hover:underline text-lg font-bold"
                            >
                                Join E-Nyouta
                                <br />
                                Share Memories
                            </a>

                            <button
                                onClick={() => isAuthenticated ? handleLogout() : navigate('/login')}
                                className="flex items-center gap-1 rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
                            >
                                {isAuthenticated ? (
                                    <img
                                        src={profileImage || defaultProfileImage}
                                        alt="profile-pic"
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <User size={27} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex py-2 justify-center">
                        <ul className="flex gap-8 px-8 justify-center items-center text-base font-bold">
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative py-2"
                                >
                                    <Link
                                        to={item.url}
                                        className="hover:text-primary hover:border-b-2 border-primary hover:font-thin flex items-center gap-3"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}