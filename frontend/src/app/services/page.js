// Image imports
import consultationImg from "../../../public/services/image 4.png";
import pharmacyImg from "../../../public/services/image 7.png";
import diagnosticImg from "../../../public/services/image 5.png";
import cardiacImg from "../../../public/services/image 6.png";
import orthoImg from "../../../public/services/image 2.png";
import neuroImg from "../../../public/services/image 1.png";
import pediatricImg from "../../../public/services/Pediat.png";
import womenImg from "../../../public/services/women.png";
import preventiveImg from "../../../public/services/image 8.png";
import physioImg from "../../../public/services/image 3.png";

import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "General Consultation",
      desc: "Comprehensive health checkups and consultations for all age groups.",
      img: consultationImg,
    },
    {
      title: "Pharmacy Services",
      desc: "On-site pharmacy with prescribed medicines and healthcare products.",
      img: pharmacyImg,
    },
    {
      title: "Diagnostic Tests",
      desc: "Accurate lab testing with quick and reliable reports.",
      img: diagnosticImg,
    },
    {
      title: "Cardiac Care",
      desc: "Preventive and ongoing care for heart-related conditions.",
      img: cardiacImg,
    },
    {
      title: "Orthopedic Care",
      desc: "Treatment for bone, joint, and muscle-related issues.",
      img: orthoImg,
    },
    {
      title: "Neurology",
      desc: "Specialized care for brain and nervous system disorders.",
      img: neuroImg,
    },
    {
      title: "Pediatric Care",
      desc: "Dedicated healthcare services for infants, children, and adolescents.",
      img: pediatricImg,
    },
    {
      title: "Women’s Health",
      desc: "Comprehensive care focused on women’s health and wellness needs.",
      img: womenImg,
    },
    {
      title: "Preventive Health Checkups",
      desc: "Routine screenings and preventive care to maintain long-term health.",
      img: preventiveImg,
    },
    {
      title: "Physiotherapy",
      desc: "Rehabilitation and physical therapy for injury recovery and mobility.",
      img: physioImg,
    },
  ];

  return (
    <main className="bg-white text-gray-800">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-36">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered with expertise and care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-gray-200 rounded-xl
                           overflow-hidden shadow-sm
                           hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="h-48 relative">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 text-green-600
                                   text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Medical Service
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-green-600 text-xl">➕</span>
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed flex gap-2">
                    <span className="text-green-600 mt-0.5">✔</span>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-white via-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Book an appointment with our experienced medical professionals.
          </p>

          {/* CTA LINK */}
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
