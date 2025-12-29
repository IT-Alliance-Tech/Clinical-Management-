export default function BookAppointmentPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white py-36">
        {/* Soft overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book an Appointment
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Schedule your visit with our experienced doctors at your convenience.
          </p>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-20 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Choose a Convenient Time
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your preferred date and time to confirm your appointment.
            </p>
          </div>

          {/* Calendly Card */}
          <div className="rounded-2xl overflow-hidden
                          border border-gray-200
                          shadow-xl bg-white">

            <iframe
              src="https://calendly.com/lavanya-italliancetech/30min"
              width="100%"
              height="720"
              frameBorder="0"
              scrolling="no"
              className="bg-white"
            ></iframe>

          </div>
        </div>
      </section>

    </main>
  );
}
