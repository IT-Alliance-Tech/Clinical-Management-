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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-green-600 flex-shrink-0">
            CarePlus Clinic
          </Link>

          {/* Navigation Links - Desktop */}
          <ul className="hidden md:flex gap-6 lg:gap-8 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-green-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-600 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:text-green-600 transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="/contactUs" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <a
              href="/book-appointment"
              onClick={handleBookClick}
              className="bg-green-600 text-white px-4 lg:px-5 py-2 rounded-lg hover:bg-green-700 transition text-sm lg:text-base whitespace-nowrap"
            >
              Book Appointment
            </a>
            <Link
              href="/admin/login"
              className="bg-white border border-gray-200 text-gray-800 px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm lg:text-base whitespace-nowrap"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <ul className="flex flex-col gap-3 text-gray-700 font-medium mb-4">
              <li>
                <Link href="/" onClick={closeMenu} className="block hover:text-green-600 transition py-2">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aboutUs" onClick={closeMenu} className="block hover:text-green-600 transition py-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={closeMenu} className="block hover:text-green-600 transition py-2">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/doctors" onClick={closeMenu} className="block hover:text-green-600 transition py-2">
                  Doctors
                </Link>
              </li>
              <li>
                <Link href="/contactUs" onClick={closeMenu} className="block hover:text-green-600 transition py-2">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-2">
              <a
                href="/book-appointment"
                onClick={(e) => {
                  handleBookClick(e);
                  closeMenu();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center font-medium"
              >
                Book Appointment
              </a>
              <Link
                href="book-appointment "
                onClick={closeMenu}
                className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-center font-medium"
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
