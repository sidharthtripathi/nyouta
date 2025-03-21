import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Camera, Gift } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#FAF0DC] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#643C28] mb-6">
              Create Your Dream Wedding Website
            </h1>
            <p className="text-xl text-[#643C28] mb-8">
              Beautiful, customizable wedding websites to share your special day with loved ones
            </p>
            <Link
              to="/wedding-website"
              className="bg-[#af7d32] text-white px-8 py-3 rounded-full hover:bg-[#8b6429] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#643C28] mb-12">
            Why Choose NYOUTA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Heart className="w-12 h-12 mx-auto text-[#af7d32] mb-4" />
              <h3 className="text-xl font-semibold text-[#643C28] mb-2">Beautiful Designs</h3>
              <p className="text-gray-600">Elegant and modern templates for your special day</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 mx-auto text-[#af7d32] mb-4" />
              <h3 className="text-xl font-semibold text-[#643C28] mb-2">Easy Planning</h3>
              <p className="text-gray-600">RSVP management and event timeline features</p>
            </div>
            <div className="text-center p-6">
              <Camera className="w-12 h-12 mx-auto text-[#af7d32] mb-4" />
              <h3 className="text-xl font-semibold text-[#643C28] mb-2">Photo Gallery</h3>
              <p className="text-gray-600">Share your precious moments with guests</p>
            </div>
            <div className="text-center p-6">
              <Gift className="w-12 h-12 mx-auto text-[#af7d32] mb-4" />
              <h3 className="text-xl font-semibold text-[#643C28] mb-2">Registry Integration</h3>
              <p className="text-gray-600">Connect your wedding registry seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FAF0DC] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#643C28] mb-6">
            Ready to Create Your Wedding Website?
          </h2>
          <p className="text-xl text-[#643C28] mb-8">
            Join thousands of couples who have created their perfect wedding website with NYOUTA
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-[#af7d32] text-white px-8 py-3 rounded-full hover:bg-[#8b6429] transition-colors"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border-2 border-[#af7d32] text-[#af7d32] px-8 py-3 rounded-full hover:bg-[#af7d32] hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;