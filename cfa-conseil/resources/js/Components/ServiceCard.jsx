import React from 'react';
import { Link } from '@inertiajs/react';

const ServiceCard = ({
  imageUrl = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title = "Missions comptables",
  description = "Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur.",
  bgColor = "#d7d7d7",
  textColor = "#252550",
  buttonLink = "/",
  buttonText = "En savoir plus"
}) => {
  // Determine text color class based on background brightness
  const isDarkBg = bgColor === "#252550";
  const titleColor = isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]";
  const descColor = isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]";

  return (
    <div 
      className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative h-1/2 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000010] to-current"
          style={{ '--tw-gradient-to': `${bgColor}`, '--tw-gradient-from': 'transparent', '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)` }}
        />
      </div>
      <div className="px-6 py-4">
        <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>
          {title}
        </h3>
        <p className={`text-lg ${descColor}`}>
          {description}
        </p>
        <Link 
          href={buttonLink}
          className={`${titleColor} inline-flex items-center justify-center py-3 rounded-lg font-medium transition-colors duration-200 mt-auto self-start`}
        >
          {buttonText}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
