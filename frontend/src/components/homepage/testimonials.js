export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from patients who trusted CarePlus Clinic
            for their healthcare needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <p className="text-gray-600 mb-4">
              “The doctors were very kind and professional. The consultation
              process was smooth and stress-free.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                😊
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Ramesh S
                </h4>
                <p className="text-sm text-gray-500">
                  Bangalore
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <p className="text-gray-600 mb-4">
              “Clean clinic, modern facilities, and quick diagnosis.
              Highly recommended for family healthcare.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Anitha R
                </h4>
                <p className="text-sm text-gray-500">
                  Mysore
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6
                          shadow-md hover:shadow-xl hover:-translate-y-1
                          transition-all duration-300">
            <p className="text-gray-600 mb-4">
              “Affordable pricing and very supportive staff.
              Booking appointments was easy and fast.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                👍
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Suresh P
                </h4>
                <p className="text-sm text-gray-500">
                  Tumkur
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
