"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // When clicking Book Appointment, require admin login token in localStorage
  const handleBookClick = (e) => {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      router.push("/book-appointment");
    } else {
      router.push("/admin/login");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo - Responsive sizing */}
          <Link 
            href="/" 
            className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 flex-shrink-0"
          >
            CarePlus Clinic
          </Link>

          {/* Navigation Links - Tablet and Desktop */}
          <ul className="hidden lg:flex gap-4 xl:gap-8 text-gray-700 font-medium text-sm xl:text-base">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-green-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-600 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:text-green-600 transition-colors">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="/contactUs" className="hover:text-green-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* CTA Buttons - Desktop/Tablet */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <a
              href="/book-appointment"
              onClick={handleBookClick}
              className="bg-green-600 text-white px-3 sm:px-4 xl:px-5 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm xl:text-base whitespace-nowrap font-medium"
            >
              Book Appointment
            </a>
            <Link
              href="/admin/login"
              className="bg-white border border-gray-200 text-gray-800 px-3 sm:px-4 xl:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm xl:text-base whitespace-nowrap font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fadeIn">
            <ul className="flex flex-col gap-1 text-gray-700 font-medium mb-4">
              <li>
                <Link 
                  href="/" 
                  onClick={closeMenu} 
                  className="block hover:text-green-600 hover:bg-green-50 transition-colors py-3 px-3 rounded-lg text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/aboutUs" 
                  onClick={closeMenu} 
                  className="block hover:text-green-600 hover:bg-green-50 transition-colors py-3 px-3 rounded-lg text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  onClick={closeMenu} 
                  className="block hover:text-green-600 hover:bg-green-50 transition-colors py-3 px-3 rounded-lg text-base"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/doctors" 
                  onClick={closeMenu} 
                  className="block hover:text-green-600 hover:bg-green-50 transition-colors py-3 px-3 rounded-lg text-base"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link 
                  href="/contactUs" 
                  onClick={closeMenu} 
                  className="block hover:text-green-600 hover:bg-green-50 transition-colors py-3 px-3 rounded-lg text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="/book-appointment"
                onClick={(e) => {
                  handleBookClick(e);
                  closeMenu();
                }}
                className="bg-green-600 text-white px-4 py-3 sm:py-3.5 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-center font-medium text-base"
              >
                Book Appointment
              </a>
              <Link
                href="/admin/login"
                onClick={closeMenu}
                className="bg-white border-2 border-gray-200 text-gray-800 px-4 py-3 sm:py-3.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors text-center font-medium text-base"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}