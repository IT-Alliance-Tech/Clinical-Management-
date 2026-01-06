// Image imports (NO spaces, lowercase filenames)
import service1 from "../../../public/services/serviceone.png";
import service2 from "../../../public/services/servicetwo.png";
import service3 from "../../../public/services/servicethree.png";
import service4 from "../../../public/services/servicefour.png";
import service5 from "../../../public/services/servicefive.png";
import service6 from "../../../public/services/servicesix.png";
import service7 from "../../../public/services/serviceseven.png";
import service8 from "../../../public/services/serviceeight.png";
import service9 from "../../../public/services/servicenine.png";
import service10 from "../../../public/services/health.png";

import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "General Consultation",
      desc: "Comprehensive health checkups and consultations for all age groups.",
      img: service1,
    },
    {
      title: "Pharmacy Services",
      desc: "On-site pharmacy with prescribed medicines and healthcare products.",
      img: service2,
    },
    {
      title: "Diagnostic Tests",
      desc: "Accurate lab testing with quick and reliable reports.",
      img: service3,
    },
    {
      title: "Cardiac Care",
      desc: "Preventive and ongoing care for heart-related conditions.",
      img: service4,
    },
    {
      title: "Orthopedic Care",
      desc: "Treatment for bone, joint, and muscle-related issues.",
      img: service5,
    },
    {
      title: "Neurology",
      desc: "Specialized care for brain and nervous system disorders.",
      img: service6,
    },
    {
      title: "Pediatric Care",
      desc: "Dedicated healthcare services for infants, children, and adolescents.",
      img: service7,
    },
    {
      title: "Women’s Health",
      desc: "Comprehensive care focused on women’s health and wellness needs.",
      img: service8,
    },
    {
      title: "Preventive Health Checkups",
      desc: "Routine screenings and preventive care to maintain long-term health.",
      img: service9,
    },
    {
      title: "Physiotherapy",
      desc: "Rehabilitation and physical therapy for injury recovery and mobility.",
      img: service10,
    },
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-36">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
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
                           overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="h-48 relative">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Badge */}
                  <span
                    className="absolute top-3 left-3 bg-white/90 text-green-600
                               text-xs font-semibold px-3 py-1 rounded-full shadow"
                  >
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
