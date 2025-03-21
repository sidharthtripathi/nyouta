import { useState } from "react";
import { X } from "lucide-react"; // Importing Lucide React for icons

const TemplatePricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex justify-center items-center min-h-[100px] z-[200]">
      {/* Fixed Navbar */}
      <nav className=" w-full bg-white shadow-md py-4 px-6 flex  justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-300 font-templateBody font-semibold text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-400"
        >
          Share
        </button>
      </nav>

      {isOpen && (
        <div className="fixed z-[999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn relative">
            {/* Close Button (Cross Icon) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl text-pricingColor font-templateBody font-bold mb-6 text-center">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Free Plan */}
              <div
                className={`border z-[1000] min-h-[400px] min-w-[300px] flex flex-col items-center justify-between p-10 rounded-lg shadow-sm text-center cursor-pointer ${
                  selectedPlan === "Free" ? "bg-gray-300" : "bg-gray-100"
                }`}
                onClick={() => handleSelectPlan("Free")}
              >
                <h3 className="text-2xl text-green-600 font-semibold font-templateBody">
                  Free Plan
                </h3>
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="text-gray-600 mt-2">Only 3 Pages Allowed</p>
                  <p className="text-gray-600">✔ Images Allowed</p>
                </div>
                <h4 className="text-2xl font-bold text-green-600 mt-4">₹0</h4>
              </div>
              {/* 551 INR Plan */}
              <div
                className={`border min-h-[400px] min-w-[300px] flex flex-col items-center justify-between p-10 rounded-lg shadow-sm text-center cursor-pointer ${
                  selectedPlan === "Standard" ? "bg-blue-300" : "bg-blue-100"
                }`}
                onClick={() => handleSelectPlan("Standard")}
              >
                <h3 className="text-2xl text-blue-600  font-semibold font-templateBody">
                  Standard Plan
                </h3>
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="text-gray-600 mt-2">All Pages Allowed</p>
                  <p className="text-gray-600">✔ Images & Videos Allowed</p>
                </div>
                <h4 className="text-2xl font-bold text-blue-600 mt-4">₹551</h4>
              </div>
              {/* 1001 INR Plan */}
              <div
                className={`border min-h-[400px] min-w-[300px] flex flex-col items-center justify-between p-10 rounded-lg shadow-sm text-center cursor-pointer ${
                  selectedPlan === "Premium" ? "bg-yellow-300" : "bg-yellow-100"
                }`}
                onClick={() => handleSelectPlan("Premium")}
              >
                <h3 className="text-2xl text-yellow-600 font-semibold font-templateBody">
                  Premium Plan
                </h3>
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="text-gray-600 mt-2">All Features Included</p>
                  <p className="text-gray-600">✔ YouTube & Photo/Video Embed</p>
                  <p className="text-gray-600">
                    ✔ All Pages with Complete Details
                  </p>
                </div>
                <h4 className="text-2xl font-bold text-yellow-600 mt-4">
                  ₹1001
                </h4>
              </div>
            </div>
            {selectedPlan && (
              <div className=" flex flex-col items-center justify-center gap-2">
                <p className="mt-4 text-center font-templateBody text-pricingColor text-lg font-semibold">
                  Selected Plan: {selectedPlan}
                </p>
                <button className="bg-red-300 font-templateBody font-semibold text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-400">
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePricing;
