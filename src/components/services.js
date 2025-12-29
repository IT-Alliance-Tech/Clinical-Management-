export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Medical Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of healthcare services to meet your needs
            with experienced doctors and modern facilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* Service Card */}
          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-semibold mb-2">
              General Consultation
            </h3>
            <p className="text-gray-600">
              Comprehensive health checkups and consultations for all age groups.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">💊</div>
            <h3 className="text-xl font-semibold mb-2">
              Pharmacy Services
            </h3>
            <p className="text-gray-600">
              On-site pharmacy with prescribed medicines and health products.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold mb-2">
              Diagnostic Tests
            </h3>
            <p className="text-gray-600">
              Accurate lab testing and diagnostics with quick reports.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">
              Cardiac Care
            </h3>
            <p className="text-gray-600">
              Preventive and ongoing care for heart-related conditions.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">🦴</div>
            <h3 className="text-xl font-semibold mb-2">
              Orthopedic Care
            </h3>
            <p className="text-gray-600">
              Treatment for bone, joint, and muscle-related issues.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">
              Neurology
            </h3>
            <p className="text-gray-600">
              Specialized care for brain and nervous system disorders.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
