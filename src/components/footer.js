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
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Doctors</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Bangalore, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ careplusclinic@gmail.com</li>
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
