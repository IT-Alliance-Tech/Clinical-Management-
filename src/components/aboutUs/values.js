export default function Values() {
  const values = [
    {
      title: "Integrity",
      icon: "🛡️",
      desc: "We practice honest, ethical, and transparent healthcare."
    },
    {
      title: "Compassion",
      icon: "❤️",
      desc: "We care deeply about every patient and their wellbeing."
    },
    {
      title: "Transparency",
      icon: "🔍",
      desc: "Clear communication and trust in every interaction."
    },
    {
      title: "Excellence",
      icon: "⭐",
      desc: "High standards in medical care and service delivery."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            The principles that guide our clinic and define how we care for our patients.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {values.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-xl p-8 text-center
                         shadow-md hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100
                              flex items-center justify-center text-2xl text-green-600">
                {item.icon}
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
