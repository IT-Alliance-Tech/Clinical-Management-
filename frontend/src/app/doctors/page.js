"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import defaultDoctor from "../../../public/doc1.png"; // fallback image

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

      // show only active doctors
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
    <main className="bg-white text-gray-800">

      {/* ---------------- HERO ---------------- */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-36">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Doctors</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Specialists aligned with every healthcare service we provide.
          </p>
        </div>
      </section>

      {/* ---------------- DOCTORS GRID ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <p className="text-center text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-500">
              No doctors available at the moment
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {doctors.map((doctor) => (
                <Link
                  key={doctor._id}
                  href={`/book-appointment?doctorId=${doctor._id}`}
                  className="group bg-white border border-gray-200 rounded-2xl
                             overflow-hidden shadow-md hover:shadow-2xl transition"
                >
                  {/* Image */}
                  <div className="relative h-72">
                    <Image
                      src={doctor.image || defaultDoctor}
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
                      {doctor.specialization}
                    </p>

                    <p className="text-sm text-gray-500">
                      {doctor.experience}+ Years Experience
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
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
