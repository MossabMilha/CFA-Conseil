import React, { useState, useRef, useEffect } from "react";
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className="absolute left-1/2 transform -translate-x-1/2 my-4 z-50 flex ">
      {/* Left decoration */}
      <div className="hidden sm:block bg-[#252550] w-12 h-12 md:w-16 md:h-16 rounded-full rounded-bl-none"></div>

      {/* Main nav */}
      <div className="flex items-center justify-between h-12 md:h-16 bg-[#252550] rounded-full px-6 md:px-8 min-w-[280px] md:min-w-[580px] lg:min-w-[820px]">
        {/* Logo */}
        <h1 className="text-white text-lg md:text-xl font-bold">
          <a href="/home">CFA-Conseil</a>
        </h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex text-white space-x-4 lg:space-x-8 text-sm md:text-base">
          <li><a href="#about">À propos</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="/blogs">Blog</a></li>
          <li>
            <a
              className="text-[#252550] bg-white rounded-full px-3 py-1 font-semibold"
              href="/contact"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Right decoration */}
      <div className="hidden sm:block bg-[#252550] w-12 h-12 md:w-16 md:h-16 rounded-full rounded-tr-none"></div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-[#252550] rounded-lg shadow-lg w-[90%] max-w-xs p-4 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-center">
            <li className="flex items-center justify-center"><a className="w-full" href="/home#about">À propos</a></li>
            <li className="flex items-center justify-center"><a className="w-full" href="/home#services">Services</a></li>
            <li className="flex items-center justify-center"><a className="w-full" href="/blogs">Blog</a></li>
            <li className="flex items-center justify-center">
              <a
                className="w-full text-[#252550] bg-white rounded-full px-3 py-1 font-semibold"
                href="/contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
