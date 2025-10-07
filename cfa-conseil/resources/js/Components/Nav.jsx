import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Dropdown from './Dropdown';
import { LogOut, SquarePen } from 'lucide-react';

export default function Nav() {
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    router.post('/logout', {}, {
      onSuccess: () => {
        // Optional: You can add any post-logout logic here
        console.log('Logged out successfully');
      },
      onError: (errors) => {
        console.error('Logout failed:', errors);
      }
    });
  }, []);

  // Handle smooth scrolling for hash links
  const scrollToSection = (e, hash) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Navigate to the home page first if we're not already there
    if (!window.location.pathname.endsWith('/')) {
      router.visit('/', {
        onSuccess: () => {
          // Small delay to ensure the page has rendered
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        },
        preserveState: true
      });
    } else {
      // If already on home page, just scroll to the section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
          <a href="/">CFA-Conseil</a>
        </h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center text-white space-x-4 lg:space-x-8 text-sm md:text-base">
          <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>À propos</a></li>
          <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>Services</a></li>
          <li><a href="/blogs">Blog</a></li>
          <li><a className="text-[#252550] bg-white rounded-full px-3 py-1 font-semibold" href="/contact">Contact</a>
          </li>
          {auth?.user?.role === 'admin' && <li>
              <Dropdown>
                <Dropdown.Trigger>
                  <div className='rounded-full w-8 h-8 bg-[#6886ab]'>
                  <img className='rounded-full w-8 h-8 object-cover' src={auth?.user?.avatar_url || 'storage/images/fallback.png'} alt="" />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Content width='auto'>
                  <Dropdown.Link  className='flex items-center gap-2 whitespace-nowrap' as="button" onClick={() => router.visit('/blogs/editor')}>
                    <SquarePen size={'1em'} /> Editeur de blog
                  </Dropdown.Link>
                  <Dropdown.Link className='flex items-center gap-2 whitespace-nowrap' as="button" onClick={handleLogout}>
                    <LogOut size={'1em'} /> Se déconnecter
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
          </li>}
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
            <li className="flex items-center justify-center"><a className="w-full" href="#about" onClick={(e) => scrollToSection(e, '#about')}>À propos</a></li>
            <li className="flex items-center justify-center"><a className="w-full" href="#services" onClick={(e) => scrollToSection(e, '#services')}>Services</a></li>
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
