export default function MissionVision() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guiding principles that define our commitment to quality healthcare.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Mission */}
          <div className="bg-white rounded-xl p-8 shadow-md
                          border-l-4 border-green-600
                          hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="text-green-600 text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide compassionate, reliable, and affordable healthcare
              services while maintaining the highest medical standards.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl p-8 shadow-md
                          border-l-4 border-green-600
                          hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <div className="text-green-600 text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted healthcare destination known for excellence,
              innovation, and patient satisfaction.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
