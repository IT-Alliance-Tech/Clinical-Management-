export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Caring for Your <br /> Health & Wellbeing
          </h1>

          <p className="text-green-100 mb-8 text-lg">
            Trusted healthcare services with experienced doctors and
            patient-focused care.
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Book Appointment
            </button>

            <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
              View Services
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 text-gray-800 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-green-600">
            Clinic Timings
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span>9:00 AM - 8:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span>9:00 AM - 5:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-red-500">Closed</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
