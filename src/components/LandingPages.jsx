import React from 'react';
import { Link } from 'react-router-dom';

const LandingPages = () => {
  return (
    <div className="landing-page relative bg-[url('./assets/jawdat.jpg')] bg-cover bg-center bg-no-repeat dark:text-white text-center py-20 px-6 ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative max-w-4xl mx-auto text-white">
        {/* Header Section */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Name of Restaurant!
        </h1>
        
       
        
        {/* CTA Button */}
        
      </div>
    </div>
  );
};

export default LandingPages;
