"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering form (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // Success!
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        reason: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* 1. Contact Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Reach out to us for appointments, enquiries, or any
            healthcare-related assistance.
          </p>
        </div>
      </section>

      {/* 2. Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl text-green-600 mb-4">📍</div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Location
            </h3>
            <p className="text-gray-600 text-sm">Bangalore, Karnataka</p>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl text-green-600 mb-4">📞</div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Phone
            </h3>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl p-6 text-center
                          shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl text-green-600 mb-4">✉️</div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Email
            </h3>
            <p className="text-gray-600 text-sm">careplusclinic@gmail.com</p>
          </div>
        </div>
      </section>

      {/* 3. Contact Form + Info */}
      <section className="py-18 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side – Useful Content */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Our team is here to assist you with appointments, follow-ups, and
              general medical enquiries. Reach out to us anytime.
            </p>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-600 text-lg">⏰</span>
                <span>Working Hours: Mon – Sat, 9:00 AM – 7:00 PM</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 text-lg">🏥</span>
                <span>Emergency Care Available</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 text-lg">📅</span>
                <span>Same-day Appointments</span>
              </li>
            </ul>
          </div>

          {/* Right Side – Form */}
          {mounted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4"
            >
              {/* Success Message */}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  ✓ Thank you! We've received your message and will respond
                  soon.
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  ✗ {error}
                </div>
              )}

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-white text-gray-800 border border-gray-300
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full bg-white text-gray-800 border border-gray-300
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-white text-gray-800 border border-gray-300
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full bg-white text-gray-800 border border-gray-300
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Reason for Contact</option>
                <option value="Book Appointment">Book Appointment</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Follow-up Consultation">
                  Follow-up Consultation
                </option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Your Message"
                required
                className="w-full bg-white text-gray-800 border border-gray-300
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white px-6 py-2.5 rounded-lg
                         font-semibold text-sm hover:bg-green-700 transition
                         disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          ) : (
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 h-96 flex items-center justify-center">
              <p className="text-gray-600">Loading form...</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Google Map – Bangalore */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Visit Our Clinic
          </h2>

          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
            <iframe
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
