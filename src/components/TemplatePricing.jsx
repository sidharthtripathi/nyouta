const TemplatePricing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div
          className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-300 flex flex-col items-center justify-between 
            transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Free Plan</h3>
          <p className="text-gray-600 mt-2">Basic Wedding Card</p>
          <h4 className="text-3xl font-bold text-green-600 mt-4">₹0</h4>
          <ul className="text-gray-700 text-left mt-6 space-y-3">
            <li>✅ Basic wedding details</li>
            <li>✅ Single-page wedding card</li>
            <li>✅ Limited customization</li>
          </ul>
          <button className="mt-6 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Get Started
          </button>
        </div>

        {/* Premium Plan */}
        <div
          className="bg-white p-8 rounded-2xl shadow-lg text-center border border-pink-500 flex flex-col items-center justify-between 
            transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Premium Plan</h3>
          <p className="text-gray-600 mt-2">Create a complete wedding card</p>
          <h4 className="text-3xl font-bold text-pink-600 mt-4">₹999</h4>
          <ul className="text-gray-700 text-left mt-6 space-y-3">
            <li>🚀 YouTube video embed</li>
            <li>📸 Photo gallery</li>
            <li>📍 Venue location integration</li>
            <li>💌 RSVP management</li>
            <li>✨ Advanced customization</li>
          </ul>
          <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePricing;
