import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/Store/slices/authSlice';
import logo from "../assets/images/nyouta-logo2.jpg";
import { ShoppingBag, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white border border-[#af7d32]">
      {/* Top Banner */}
      <div className="h-8 flex justify-between items-center px-6 lg:px-16 bg-[#FAF0DC]">
        <div className="bg-[#af7d32] rounded-b-2xl text-white flex items-center justify-center px-4 py-1 tracking-widest text-sm sm:text-lg">
          NYOUTA
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-6 lg:px-16 py-4">
        {/* Logo + Wedding Website Link */}
        <div className="flex flex-col">
          <Link to="/">
            <img src={logo} alt="Nyouta Logo" className="w-48 h-auto" />
          </Link>
          <Link
            to="/wedding-website"
            className="mt-4 text-lg text-[#7d5a2a] font-medium hover:text-[#af7d32]"
          >
            Wedding Website
          </Link>
        </div>

        {/* Login & Cart Icons on the Right */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-[#7d5a2a] hover:text-[#af7d32]">
            <ShoppingBag size={22} />
          </Link>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <span className="text-[#7d5a2a] font-medium">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-[#d33b3b] hover:text-[#af7d32] font-medium flex items-center"
              >
                <LogOut className="mr-1" size={20} />
                Logout
              </button>
            </div>
          ) : !isAuthenticated && location.pathname !== '/login' && (
            <Link
              to="/login"
              className="text-[#d33b3b] hover:text-[#af7d32] font-medium flex items-center"
            >
              <User className="mr-1" size={20} /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
