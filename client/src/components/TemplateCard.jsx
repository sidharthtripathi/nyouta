import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    navigate(`/wedding-website/template/${template.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={handleTemplateClick}
    >
      <div className="relative h-48">
        <img
          src={template.thumbnail || "https://via.placeholder.com/400x300"}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-semibold">Preview Template</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Category: {template.category}</span>
          <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300">
            Use Template
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;