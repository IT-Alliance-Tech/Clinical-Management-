export default function AboutCTA() {
  return (
    <section className="py-28 bg-gradient-to-r from-white via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Your Health Deserves <br className="hidden md:block" />
          the Best Care
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Schedule your appointment with our experienced doctors and
          take the first step toward better health today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold
                             hover:bg-green-700 transition">
            Book Appointment
          </button>

          <button className="border border-green-600 text-green-600 px-8 py-4 rounded-lg
                             font-semibold hover:bg-green-600 hover:text-white transition">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
}
