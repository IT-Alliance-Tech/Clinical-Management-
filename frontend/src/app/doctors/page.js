"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import defaultDoctor from "../../../public/doctor.png";

/* -------- TIME FORMAT HELPER -------- */
const formatTime = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${m} ${suffix}`;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DOCTORS ---------------- */
  const fetchDoctors = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors/admin/all`
      );
      const data = await res.json();

      const activeDoctors = (data.data || []).filter(
        (doc) => doc.isActive
      );

      setDoctors(activeDoctors);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white text-gray-800">

      {/* ---------------- HERO ---------------- */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-semibold tracking-wide">
              MEDICAL EXCELLENCE
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Meet Our Expert Doctors
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            Highly qualified specialists dedicated to providing exceptional healthcare services tailored to your needs.
          </p>
        </div>
      </section>

      {/* ---------------- DOCTORS GRID ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Medical Team
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a doctor from our team of experienced specialists
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <p className="text-gray-500 text-lg">
                No doctors available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {doctors.map((doctor) => {
                const imageSrc = doctor.image || defaultDoctor.src;

                return (
                  <Link
                    key={doctor._id}
                    href={`/book-appointment?doctorId=${doctor._id}`}
                    className="group bg-white border-2 border-gray-100 rounded-2xl
                               overflow-hidden shadow-lg hover:shadow-2xl
                               hover:border-green-500 transition-all duration-300
                               transform hover:-translate-y-2
                               flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-green-50 to-green-100 flex-shrink-0">
                      <Image
                        src={imageSrc}
                        alt={doctor.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow gap-3">

                      {/* Doctor Name */}
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {doctor.name}
                      </h3>

                      {/* Department */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          🏥
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Department</p>
                          <p className="text-sm font-semibold text-green-600">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>

                      {/* Available Days */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          📅
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Available Days</p>
                          <p className="text-sm font-semibold text-gray-700">
                            {doctor.availability?.days?.length
                              ? doctor.availability.days.join(", ")
                              : "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Available Time */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          ⏰
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Timings</p>
                          <p className="text-sm font-semibold text-gray-700">
                            {doctor.availability?.startTime &&
                            doctor.availability?.endTime
                              ? `${formatTime(
                                  doctor.availability.startTime
                                )} - ${formatTime(
                                  doctor.availability.endTime
                                )}`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Book Button (ALWAYS AT BOTTOM) */}
                      <div className="mt-auto pt-4">
                        <div className="w-full bg-green-600 text-white text-center py-2.5 rounded-lg
                                        font-semibold group-hover:bg-green-700 transition-colors">
                          Book Appointment →
                        </div>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ---------------- CTA (RESTORED) ---------------- */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-100">
            <div className="text-5xl mb-6">🩺</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Consult a Specialist?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Choose a doctor based on your healthcare needs and book your appointment instantly.
            </p>

            <Link
              href="/book-appointment"
              className="inline-block bg-green-600 text-white px-10 py-4 rounded-xl
                         font-bold text-lg hover:bg-green-700 transition-all
                         shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Appointment Now
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              ✓ Quick & Easy Booking • ✓ Expert Care • ✓ Available 24/7
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
