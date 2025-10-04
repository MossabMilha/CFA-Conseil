import React from 'react';
import { Link, router } from '@inertiajs/react';
import FacebookIcon from '@/assets/icons-facebook.svg?react';
import TwitterIcon from '@/assets/icons-x.svg?react';
import LinkedInIcon from '@/assets/icons-linkedin.svg?react';
import GoogleIcon from '@/assets/icons-google-plus.svg?react';

// Handle smooth scrolling for hash links
const scrollToSection = (e, hash) => {
  e.preventDefault();
  
  // Navigate to the home page first if we're not already there
  if (!window.location.pathname.endsWith('/home')) {
    router.visit('/home', {
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

export default function Footer() {
    return (
        <div className="bg-[#252550] text-white">
            <footer className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Left content */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* About */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">CFA Conseil</h3>
                            <p className="text-sm sm:text-base md:text-lg max-w-[300px]">
                                CFA Conseil, cabinet comptable agréé basé à Casablanca, accompagne PME et grandes entreprises en comptabilité, finance, audit, conseil juridique et fiscal. Votre partenaire de confiance pour des solutions fiables et une croissance durable.
                            </p>
                        </div>

                        {/* Short Links */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold">Short links</h3>
                            <ul className="list-inside text-sm sm:text-base md:text-lg flex flex-col gap-1">
                                <li><Link href="/home" className="hover:underline">Accueil</Link></li>
                                <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:underline">Qui sommes-nous</a></li>
                                <li><a href="#why-choose-us" onClick={(e) => scrollToSection(e, '#why-choose-us')} className="hover:underline">Pourquoi nous choisissez</a></li>
                                <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:underline">Nos services</a></li>
                                <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:underline">Contact</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold">Contactez-nous</h3>

                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-sm sm:text-base md:text-lg font-bold">Telephone</h4>
                                <p className="text-sm sm:text-base md:text-lg">+212 5 22 21 03 93</p>
                                <p className="text-sm sm:text-base md:text-lg">+212 6 70 05 04 47</p>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-sm sm:text-base md:text-lg font-bold">Email</h4>
                                <p className="text-sm sm:text-base md:text-lg">contact@cfa-conseil.com</p>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-sm sm:text-base md:text-lg font-bold">Adresse</h4>
                                <p className="text-sm sm:text-base md:text-lg">
                                    Horizon Business Center,<br/>
                                    Avenue Yafa N 3, Ain Chok<br/>
                                    Casablanca
                                </p>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold">Follow us</h3>
                            <div className="flex gap-2">
                                <a href="#" rel="noopener noreferrer">
                                    <FacebookIcon className="w-6 h-6 sm:w-8 sm:h-8" style={{ '--fill-color': '#fff' }} />
                                </a>
                                <a href="#" rel="noopener noreferrer">
                                    <TwitterIcon className="w-6 h-6 sm:w-8 sm:h-8" style={{ '--fill-color': '#fff' }} />
                                </a>
                                <a href="#" rel="noopener noreferrer">
                                    <LinkedInIcon className="w-6 h-6 sm:w-8 sm:h-8" style={{ '--fill-color': '#fff' }} />
                                </a>
                                <a href="#" rel="noopener noreferrer">
                                    <GoogleIcon className="w-6 h-6 sm:w-8 sm:h-8" style={{ '--fill-color': '#fff' }} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-sm sm:text-base md:text-lg text-center lg:text-left mt-4">
                        © {new Date().getFullYear()} CFA Conseil. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    )
}
