export default function ClinicJourney() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A brief look at how CarePlus Clinic has grown over the years
            with trust, care, and medical excellence.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-green-200 ml-4 space-y-14">

          {/* Item */}
          <div className="relative pl-10">
            <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-green-600
                            flex items-center justify-center text-white">
              🏥
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              2014 – Clinic Founded
            </h3>
            <p className="text-gray-600">
              CarePlus Clinic was established with a vision to provide
              affordable and ethical healthcare services.
            </p>
          </div>

          {/* Item */}
          <div className="relative pl-10">
            <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-green-600
                            flex items-center justify-center text-white">
              👨‍⚕️
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              2017 – Team Expansion
            </h3>
            <p className="text-gray-600">
              Added experienced specialists and expanded services
              to meet growing patient needs.
            </p>
          </div>

          {/* Item */}
          <div className="relative pl-10">
            <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-green-600
                            flex items-center justify-center text-white">
              🧪
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              2020 – Modern Diagnostics
            </h3>
            <p className="text-gray-600">
              Introduced advanced diagnostic equipment and digital records
              for better accuracy and efficiency.
            </p>
          </div>

          {/* Item */}
          <div className="relative pl-10">
            <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-green-600
                            flex items-center justify-center text-white">
              ⭐
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              2024 – Trusted by Thousands
            </h3>
            <p className="text-gray-600">
              Successfully treated thousands of patients and became
              a trusted healthcare destination.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
