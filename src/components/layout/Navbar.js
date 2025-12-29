import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          CarePlus Clinic
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
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

        {/* CTA */}
       <Link
  href="/book-appointment"
  className="bg-green-600 text-white px-5 py-2 rounded-lg
             hover:bg-green-700 transition"
>
  Book Appointment
</Link>

      </div>
    </nav>
  );
}
