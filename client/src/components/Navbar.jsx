import React from "react";
import logo from "../assets/images/nyouta-logo2.jpg";

const Navbar = () => {
  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white border border-[#af7d32]">
      <div className="h-8 flex justify-between items-center px-6 lg:px-16 bg-[#FAF0DC]">
        <div className="bg-[#af7d32] rounded-b-2xl text-white  flex items-center justify-center px-4 py-1 tracking-widest text-sm sm:text-lg">
          NYOUTA
        </div>
      </div>

      <div className="flex justify-between items-center px-6 lg:px-16 py-2">
        <div className="flex items-center">
          <img src={logo} alt="Nyouta Logo" className="w-48 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
