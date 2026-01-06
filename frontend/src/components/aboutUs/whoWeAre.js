export default function WhoWeAre() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block text-green-600 font-semibold mb-3">
              About Our Clinic
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Who We Are
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              CarePlus Clinic is a modern healthcare center offering
              comprehensive medical services with a strong focus on
              patient comfort and ethical care.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our team of experienced doctors and staff are committed to
              providing personalized and affordable healthcare solutions.
            </p>
          </div>

          {/* Right Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-white border border-gray-200 rounded-xl p-6
                            shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-3xl mb-3">👨‍⚕️</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                Expert Doctors
              </h4>
              <p className="text-gray-600 text-sm">
                Highly qualified and experienced medical professionals.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6
                            shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-3xl mb-3">🧪</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                Modern Diagnostics
              </h4>
              <p className="text-gray-600 text-sm">
                Advanced diagnostic tools for accurate medical results.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6
                            shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-3xl mb-3">💰</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                Affordable Care
              </h4>
              <p className="text-gray-600 text-sm">
                Transparent and affordable healthcare services for everyone.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6
                            shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-3xl mb-3">🤝</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                Patient First
              </h4>
              <p className="text-gray-600 text-sm">
                Friendly environment with patient-focused medical care.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
