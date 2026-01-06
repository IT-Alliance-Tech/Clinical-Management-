export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose CarePlus Clinic
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing high-quality healthcare services
            with a patient-first approach.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100
                            flex items-center justify-center text-3xl">
              👨‍⚕️
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Experienced Doctors
            </h3>
            <p className="text-gray-600 text-sm">
              Highly qualified doctors with years of medical experience.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100
                            flex items-center justify-center text-3xl">
              🏥
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Modern Facilities
            </h3>
            <p className="text-gray-600 text-sm">
              Well-equipped clinic with modern medical technology.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100
                            flex items-center justify-center text-3xl">
              💰
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Affordable Pricing
            </h3>
            <p className="text-gray-600 text-sm">
              Transparent and affordable treatment plans for all.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100
                            flex items-center justify-center text-3xl">
              ⏰
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Timely Care
            </h3>
            <p className="text-gray-600 text-sm">
              Quick consultations and minimal waiting time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
