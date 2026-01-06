import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Clinic Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            CarePlus Clinic
          </h3>
          <p className="text-gray-400">
            Providing quality healthcare services with trusted doctors and
            patient-friendly care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:text-white transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="/contactUs" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Bangalore, India</li>
            <li>
              <a
                href="tel:+919876543210"
                className="hover:text-white transition"
              >
                📞 +91 98765 43210
              </a>
            </li>
            <li>
              <a
                href="mailto:careplusclinic@gmail.com"
                className="hover:text-white transition"
              >
                ✉️ careplusclinic@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2025 CarePlus Clinic. All rights reserved.
      </div>
    </footer>
  );
}
