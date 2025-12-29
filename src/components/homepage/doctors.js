export default function Doctors() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our experienced and dedicated doctors are here to provide
            the best medical care for you and your family.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Doctor Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-100
                            flex items-center justify-center text-5xl mb-4">
              👨‍⚕️
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Dr. Ramesh Kumar
            </h3>
            <p className="text-green-600 font-medium mb-2">
              General Physician
            </p>
            <p className="text-gray-600 text-sm">
              10+ years of experience in primary and preventive healthcare.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-100
                            flex items-center justify-center text-5xl mb-4">
              👩‍⚕️
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Dr. Anitha Rao
            </h3>
            <p className="text-green-600 font-medium mb-2">
              Cardiologist
            </p>
            <p className="text-gray-600 text-sm">
              Specialized in heart care with advanced diagnostic expertise.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-100
                            flex items-center justify-center text-5xl mb-4">
              👨‍⚕️
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Dr. Suresh Patel
            </h3>
            <p className="text-green-600 font-medium mb-2">
              Orthopedic Specialist
            </p>
            <p className="text-gray-600 text-sm">
              Expert in bone, joint, and muscle injury treatments.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
