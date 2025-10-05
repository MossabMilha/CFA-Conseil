import React, { memo, useMemo } from 'react';
import { Link } from '@inertiajs/react';

const ServiceCard = memo(({
  imageUrl = "/images/placeholder-service.jpg",
  title = "Missions comptables",
  description = "Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur.",
  bgColor = "#d7d7d7",
  textColor = "#252550",
  buttonLink = "/services",
  buttonText = "En savoir plus"
}) => {
  // Determine text color class based on background brightness
  const isDarkBg = bgColor === "#252550";
  const titleColor = isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]";
  const descColor = isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]";

  // Pre-calculate text colors to avoid redundant calculations
  const textColors = useMemo(() => ({
    title: isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]",
    desc: isDarkBg ? "text-[#d7d7d7]" : "text-[#252550]"
  }), [isDarkBg]);

  // Memoize the gradient style to prevent unnecessary re-renders
  const gradientStyle = useMemo(() => ({
    '--tw-gradient-to': bgColor,
    '--tw-gradient-from': 'transparent',
    '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
  }), [bgColor]);

  // Use React.memo to prevent unnecessary re-renders
  const MemoizedImage = useMemo(() => (
    <div className="relative h-2/5 sm:h-1/2 w-full">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        width={400}
        height={300}
        decoding="async"
        fetchpriority="low"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000010] to-current"
        style={gradientStyle}
      />
    </div>
  ), [imageUrl, title, gradientStyle]);

  return (
    <article 
      className="relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 transform-gpu will-change-transform"
      style={{ 
        backgroundColor: bgColor, 
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
      aria-labelledby={`service-${title.replace(/\s+/g, '-').toLowerCase()}-title`}
    >
      {MemoizedImage}
      <div className="px-6 py-4">
        <h3 
          id={`service-${title.replace(/\s+/g, '-').toLowerCase()}-title`}
          className={`text-2xl font-bold ${textColors.title} mb-2`}
        >
          {title}
        </h3>
        <p className={`text-lg ${textColors.desc} line-clamp-3`}>
          {description}
        </p>
        <Link 
          href={buttonLink}
          className={`${textColors.title} inline-flex items-center justify-center py-3 rounded-lg font-medium transition-colors duration-200 mt-4 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#252550]`}
          aria-label={`En savoir plus sur ${title}`}
        >
          {buttonText}
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
            focusable="false"
          >
            <title>Flèche vers la droite</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
});

export default ServiceCard;
