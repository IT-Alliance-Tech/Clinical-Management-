import Image from "next/image";
import Link from "next/link";

// Doctor images
import doctor1 from "../../../public/doc1.png";
import doctor2 from "../../../public/doc2.png";
import doctor3 from "../../../public/doc3.png";
import doctor4 from "../../../public/doc4.png";
import doctor5 from "../../../public/doc5.png";
import doctor6 from "../../../public/doc5.png";
import doctor7 from "../../../public/doc5.png";
import doctor8 from "../../../public/doc5.png";

export default function DoctorsPage() {
  const doctors = [
    {
      name: "Dr. Ramesh Kumar",
      position: "General Physician",
      experience: "10+ Years Experience",
      image: doctor1,
    },
    {
      name: "Dr. Anitha Rao",
      position: "Cardiologist",
      experience: "12+ Years Experience",
      image: doctor2,
    },
    {
      name: "Dr. Suresh Patel",
      position: "Orthopedic Specialist",
      experience: "9+ Years Experience",
      image: doctor3,
    },
    {
      name: "Dr. Arjun Verma",
      position: "Neurologist",
      experience: "11+ Years Experience",
      image: doctor4,
    },
    {
      name: "Dr. Meera Nair",
      position: "Pediatrician",
      experience: "8+ Years Experience",
      image: doctor5,
    },
    {
      name: "Dr. Kavya Iyer",
      position: "Gynecologist (Women’s Health)",
      experience: "10+ Years Experience",
      image: doctor6,
    },
    {
      name: "Dr. Rohit Sharma",
      position: "Diagnostic Specialist",
      experience: "7+ Years Experience",
      image: doctor7,
    },
    {
      name: "Dr. Neha Kapoor",
      position: "Physiotherapist",
      experience: "6+ Years Experience",
      image: doctor8,
    },
  ];

  return (
    <main className="bg-white text-gray-800">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-36">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Our Doctors
          </h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Specialists aligned with every healthcare service we provide.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {doctors.map((doctor) => (
              <Link
                key={doctor.name}
                href="/book-appointment"
                className="group bg-white border border-gray-200 rounded-2xl
                           overflow-hidden shadow-md hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="relative h-72">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.name}
                  </h3>

                  <p className="text-green-600 font-medium">
                    {doctor.position}
                  </p>

                  <p className="text-sm text-gray-500">
                    {doctor.experience}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-white via-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Consult the Right Specialist
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Choose a doctor based on your healthcare needs and book instantly.
          </p>

          <Link
            href="/book-appointment"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg
                       font-semibold hover:bg-green-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      </section>

    </main>
  );
}
