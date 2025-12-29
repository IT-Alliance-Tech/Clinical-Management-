export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="text-2xl font-bold text-green-600">
          CarePlus Clinic
        </div>

        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-green-600 cursor-pointer">Home</li>
          <li className="hover:text-green-600 cursor-pointer">About</li>
          <li className="hover:text-green-600 cursor-pointer">Services</li>
          <li className="hover:text-green-600 cursor-pointer">Doctors</li>
          <li className="hover:text-green-600 cursor-pointer">Contact</li>
        </ul>

        <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
          Book Appointment
        </button>
      </div>
    </nav>
  );
}
