// Image imports
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

// Service Card Component (Optimized)
function ServiceCard({ title, desc, img, index }) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={index < 3}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-green-100">
          Medical Service
        </span>

        {/* Number Badge */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
          {index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            ✓
          </span>
          {title}
        </h3> 

        <p className="text-gray-600 leading-relaxed text-sm">
          {desc} 
        </p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-50 rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// Main Component
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
      title: "Women's Health",
      desc: "Comprehensive care focused on women's health and wellness needs.",
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
    <main className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-800">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white py-22 sm:py-32 lg:py-30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-50">Healthcare Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Our Medical Services
          </h1>
          <p className="text-lg sm:text-xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare services delivered with expertise, compassion, and cutting-edge technology.
          </p>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">10+</div>
              <div className="text-xs sm:text-sm text-green-100">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50+</div>
              <div className="text-xs sm:text-sm text-green-100">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-green-100">Care Available</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From preventive care to specialized treatments, we're here for your health journey.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                desc={service.desc}
                img={service.img}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Need Medical Assistance?
          </h2>
          <p className="text-lg sm:text-xl text-green-50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Book an appointment with our experienced medical professionals and take the first step toward better health.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Book Appointment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/contactUs"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-green-50 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Doctors
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Instant Confirmation
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure & Private
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}